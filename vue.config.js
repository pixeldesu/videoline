module.exports = {
  transpileDependencies: [
    'vuetify',
    'vuex-persist',
  ],
  pwa: {
    name: 'videoline',
    themeColor: '#1976d2',
    msTileColor: '#1976d2',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    manifestOptions: {
      background_color: '#1976d2',
    },

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/serviceWorker.js',
      swDest: 'service-worker.js',
    },
  },
};
