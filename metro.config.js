// metro.config.js
module.exports = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: ['svg'],
    },
};
