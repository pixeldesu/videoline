module.exports = {
  transpileDependencies: [
    'vuetify',
    'vuex-persist',
  ],
  pwa: {
    name: 'videoline',
    themeColor: '#311b92',
    msTileColor: '#311b92',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/serviceWorker.js',
      swDest: 'service-worker.js',
    },
  },
};
