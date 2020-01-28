export default {
  channels: [],
  drawer: false,
  fuse: null,
  loading: false,
  searchQuery: '',
  selectedChannel: 0,
  videos: [],
  sorting: {
    property: 'published',
    order: 'desc',
  },
  config: {
    corsProxyUrl: 'https://cors-anywhere.herokuapp.com/',
    videoLinkProvider: 'https://invidio.us/watch?v=',
    customVideoLinkProvider: '',
  },
};
