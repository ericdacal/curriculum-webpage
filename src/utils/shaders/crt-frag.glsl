precision highp float;
varying vec2 vUv;
uniform sampler2D texture;
uniform vec2 curvature;
uniform float screenResolution;
uniform float scanLineOpacity;

vec2 curveRemapUV(vec2 uv) {
  uv = uv * 2.0 - 1.0;
  vec2 offset = abs(uv.yx) / curvature;
  uv = uv + uv * offset * offset;
  uv = uv * 0.5 + 0.5;
  return uv;
}

float scanLineIntensity(float uv, float resolution, float opacity) {
  float intensity = sin(uv * resolution * 3.14159265 * 2.0);
  intensity = ((0.5 * intensity) + 0.5) * 0.9 + 0.1;
  return pow(intensity, opacity);
}

void main() {
  vec2 remappedUV = curveRemapUV(vUv);
  if (remappedUV.x < 0.0 || remappedUV.y < 0.0 || remappedUV.x > 1.0 || remappedUV.y > 1.0) {
    discard;
  } else {
    float lineIntensity = scanLineIntensity(remappedUV.x, screenResolution, scanLineOpacity);
    gl_FragColor = vec4(vec3(lineIntensity), 1.0);
    // Apply texture sampling and additional effects as needed
  }
}