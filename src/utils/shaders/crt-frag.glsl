uniform sampler2D tDiffuse;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    uv.y = 1.0 - uv.y; // Flip the Y-axis to match the texture

    // Apply distortion effect
    float distortion = sin(uv.y * 200.0) * 0.005;
    uv.x += distortion;
    uv.y += distortion;

    // Apply color separation effect
    vec2 offset1 = vec2(0.001, 0.0);
    vec2 offset2 = vec2(0.0, 0.001);
    float r = texture2D(tDiffuse, uv - offset1).r;
    float g = texture2D(tDiffuse, uv).g;
    float b = texture2D(tDiffuse, uv + offset2).b;

    // Combine color channels with different offsets
    vec3 color = vec3(r, g, b);

    // Add emission to simulate CRT glow
    vec3 emissionColor = vec3(0.2, 0.5, 0.2); // Adjust emission color as needed
    color += emissionColor;

    gl_FragColor = vec4(color, 1.0);
}