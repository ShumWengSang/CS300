#version 410 core

uniform vec3 lightColor;
uniform vec3 lightDirection;
uniform vec3 Projection;

in VS_GS_VERTEX
{
    vec3 fragNormal;
    vec4 worldPosition;
    vec4 objectColor;
} fs_in;


out vec4 fragColor;

void main()
{
    // Ambient
    float ambientCoefficient = 0.9f;
    vec4 ambient = vec4(ambientCoefficient * lightColor, 1.0f);

    // Diffuse
    vec3 lightDir = normalize(lightDirection);
    float N_dot_L = max( dot( normalize(fs_in.fragNormal), lightDir), 0.0f);
    vec4 diffuse = vec4(N_dot_L * lightColor, 1.0f);

    // Final Color
    vec4 finalLightColor = ambient + diffuse;
    fragColor = finalLightColor * fs_in.objectColor;

}