export default {
  videoUrl: (state) => {
    if (state.config.videoLinkProvider === 'custom' && state.config.customVideoLinkProvider !== '') {
      return state.config.customVideoLinkProvider;
    }

    return state.config.videoLinkProvider;
  },
};
