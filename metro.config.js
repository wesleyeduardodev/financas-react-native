const { getDefaultConfig } = require('metro-config');

module.exports = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'), // Usando o transformer para arquivos SVG
    },
    resolver: {
        assetExts: ['bin', 'mp4', 'txt', 'svg'],  // Adicionando 'svg' para ser tratado como um arquivo estático
    },
    // Usando configurações padrão do Metro para o projeto
    ...getDefaultConfig(),
};
