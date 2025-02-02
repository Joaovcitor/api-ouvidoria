export const presets = [
  ["@babel/preset-env", { targets: { node: "current" } }]
];
export const plugins = [
  "@babel/plugin-transform-modules-commonjs" // Adicionando este plugin para converter módulos ESM para CommonJS
];
