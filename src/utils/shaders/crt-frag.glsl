varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform float scanlineIntensity;

void main() {
    vec4 texel = texture2D(tDiffuse, vUv);
    vec2 uv = vUv * vec2(1.0, 1.0 + scanlineIntensity);
    vec4 scanlineColor = vec4(0.0, 0.0, 0.0, 0.5); // Adjust scanline color and opacity here
    vec4 scanline = mix(texel, scanlineColor, 0.5 + 0.5 * sin(uv.y * 400.0));
    gl_FragColor = scanline;
}