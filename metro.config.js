// Prefer resolução "react-native" nos exports (ex.: zustand → CJS sem import.meta)
// em vez de "import" (.mjs), que quebra o bundle web do Metro.
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const prev = config.resolver.unstable_conditionNames ?? [];
config.resolver.unstable_conditionNames = ['react-native', ...prev];

module.exports = config;
