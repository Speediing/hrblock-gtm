struct Params {
  time: f32,
  texel: vec2f,
}

@group(0) @binding(0) var<uniform> params: Params;

fn sdBox(p: vec2f, b: vec2f) -> f32 {
  let d = abs(p) - b;
  return length(max(d, vec2f(0.0))) + min(max(d.x, d.y), 0.0);
}

fn sdRoundedBox(p: vec2f, b: vec2f, r: f32) -> f32 {
  return sdBox(p, max(b - vec2f(r), vec2f(0.0))) - r;
}

fn hash21(p: vec2f) -> f32 {
  return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453);
}

fn computerDistance(p: vec2f) -> f32 {
  let frame = sdRoundedBox(p, vec2f(0.145, 0.105), 0.018);
  let screen = sdRoundedBox(p + vec2f(0.0, 0.008), vec2f(0.122, 0.076), 0.009);
  let stand = sdBox(p - vec2f(0.0, 0.128), vec2f(0.018, 0.028));
  let base = sdRoundedBox(p - vec2f(0.0, 0.16), vec2f(0.065, 0.008), 0.004);
  return min(min(abs(frame), abs(screen)), min(abs(stand), abs(base)));
}

fn ribbons(p: vec2f, t: f32) -> f32 {
  var acc = 0.0;
  for (var i = 0; i < 5; i = i + 1) {
    let fi = f32(i);
    let y0 = -0.30 + fi * 0.135;
    let amp = 0.032 + fi * 0.007;
    let freq = 5.4 + fi * 1.65;
    let speed = 0.28 + fi * 0.09;
    let y = y0 + amp * sin(p.x * freq + t * speed + fi * 1.1);
    let d = abs(p.y - y);
    acc += (1.0 - smoothstep(0.0, 0.0032, d)) * (0.28 - fi * 0.03);
  }
  return acc;
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.texel.y / max(params.texel.x, 1.0e-6);
  let p = (uv - vec2f(0.5)) * vec2f(aspect, 1.0);
  let t = params.time;
  let breathe = 1.0 + 0.018 * sin(t * 0.8);

  let computerA = computerDistance((p - vec2f(0.42, -0.12)) / breathe);
  let computerB = computerDistance((p - vec2f(0.24, 0.12)) / breathe);
  let computerC = computerDistance((p - vec2f(0.58, 0.16)) / breathe);
  let computers = min(computerA, min(computerB, computerC));
  let computerLine = 1.0 - smoothstep(0.0, 0.006, computers);

  let traces = ribbons(p, t);
  let cell = floor(uv * vec2f(32.0, 18.0));
  let h = hash21(cell);
  let spark = step(0.972, h) * (0.45 + 0.55 * sin(t * 1.8 + h * 40.0));

  let green = vec3f(0.078431, 0.666667, 0.250980);
  let paper = vec3f(0.956863, 0.941176, 0.901961);
  let leftClear = smoothstep(0.34, 0.62, uv.x);
  var a = computerLine * 0.3 + traces * 0.32 + spark * 0.06;
  a *= 0.55 * leftClear;
  a = clamp(a, 0.0, 0.34);
  let col = mix(green, paper, spark * 0.45 + computerLine * 0.05);
  return vec4f(col * a, a);
}
