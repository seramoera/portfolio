import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

// A warm paper field. Deliberately low contrast: soft peach and blue sines
// drifting at breathing speed, with a hair of dither so the cream never bands.
const FRAG = `
precision mediump float;

uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 res = u_res;
  vec2 p = (gl_FragCoord.xy - 0.5 * res) / min(res.x, res.y);
  float t = u_time * 0.05;

  float a = sin(p.x * 2.2 + t * 0.9) * sin(p.y * 1.7 - t * 0.7);
  float b = sin((p.x + p.y) * 1.5 + t * 0.55);
  float c = sin((p.x - p.y) * 1.1 - t * 0.4);

  float warm = clamp(0.5 + 0.36 * a + 0.26 * b + 0.12 * c, 0.0, 1.0);
  float cool = clamp(0.5 + 0.34 * b - 0.22 * a + 0.1 * c, 0.0, 1.0);

  vec3 paper = vec3(0.957, 0.918, 0.843);
  vec3 peach = vec3(1.0, 0.824, 0.69);
  vec3 blue = vec3(0.72, 0.79, 0.95);
  vec3 orange = vec3(0.886, 0.341, 0.173);

  vec3 col = paper;
  col = mix(col, peach, warm * 0.4);
  col = mix(col, blue, cool * 0.13);
  col = mix(col, orange, pow(warm * cool, 2.0) * 0.06);

  vec2 m = (u_mouse - 0.5) * vec2(res.x / res.y, 1.0);
  float d = length(p - m * 1.2);
  col = mix(col, peach, exp(-d * d * 2.2) * 0.35);

  float vig = smoothstep(1.35, 0.15, length(p * vec2(0.9, 1.1)));
  col *= 0.955 + 0.06 * vig;

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(log || 'shader compile failed')
  }
  return shader
}

export default function ShaderBackdrop() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power',
      }) || canvas.getContext('experimental-webgl')

    // No WebGL: the CSS gradients in the hero are a fine fallback.
    if (!gl) return

    let program
    try {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT)
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
      program = gl.createProgram()
      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'link failed')
      }
    } catch (error) {
      // Fail quietly; the page is designed to survive without the shader.
      console.warn('Shader backdrop disabled:', error.message)
      return
    }

    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    )

    const aPos = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'u_res')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uTime = gl.getUniformLocation(program, 'u_time')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const pointer = { x: 0.5, y: 0.4 }
    const smooth = { x: 0.5, y: 0.4 }
    let raf = 0
    let running = false
    const start = performance.now()

    const resize = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        window.innerWidth < 720 ? 1 : 1.5
      )
      const w = Math.max(1, Math.round(window.innerWidth * dpr))
      const h = Math.max(1, Math.round(window.innerHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }

    const draw = (now) => {
      smooth.x += (pointer.x - smooth.x) * 0.035
      smooth.y += (pointer.y - smooth.y) * 0.035

      resize()
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uMouse, smooth.x, smooth.y)
      gl.uniform1f(uTime, (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      running = !reduced
      raf = reduced ? 0 : requestAnimationFrame(draw)
    }

    const startLoop = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(draw)
    }

    const stopLoop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onPointerMove = (event) => {
      pointer.x = event.clientX / window.innerWidth
      pointer.y = 1 - event.clientY / window.innerHeight
    }

    const onVisibility = () => {
      if (document.hidden) stopLoop()
      else if (!reduced) startLoop()
    }

    // One frame immediately so there is no flash of empty background.
    draw(performance.now())
    if (!reduced) startLoop()

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stopLoop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibility)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [])

  return <canvas ref={canvasRef} className="shader-backdrop" aria-hidden="true" />
}
