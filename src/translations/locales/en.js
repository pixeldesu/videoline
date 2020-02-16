export default {
  buttonText: {
    add: 'add',
    close: 'close',
  },
  aboutDialog: {
    title: 'About',
    introtext: 'videoline is a Google-free YouTube "subscription" manager. Utilizing RSS feeds to follow activity of channels and display videos in a YouTube-like fashion!',
    releases: 'Releases',
    githubLink: 'View on GitHub',
  },
  appBar: {
    search: 'Search',
    addfeed: 'Add Feed',
    refresh: 'Refresh',
  },
  appNavigationDrawer: {
    subheader: 'Channels',
    allchannels: 'All channels',
  },
  feedDialog: {
    title: 'Add Channel Feed',
    radioChannelID: 'Channel ID',
    radioUsername: 'Username',
    hintChannelID: 'You can get the channel ID from a YouTube video page. The link on the username includes it.',
    hintUser: 'This is the general format for URLs of YouTube channels. You can also get the username from the link on the avatar of a video uploader.',
    feedPlaceholderChannelID: 'YouTube channel ID',
    feedPlaceholderUsername: 'YouTube username',
  },
  feedSortFilter: {
    sortBy: 'Sort by',
    order: 'Order',
    allowedProperties: {
      publishedDate: 'Published Date',
      views: 'Views',
      rating: 'Rating',
    },
    allowedOrderings: {
      ascending: 'Ascending',
      descending: 'Descending',
    },
  },
  feedItem: {
    views: 'no views | 1 view | {count} views',
  },
  settingsDialog: {
    title: 'Settings',
    headline: 'Settings',
    darktheme: 'Dark Theme',
    videoLinkProviderTitle: 'Video Link Provider',
    radioCustomLabel: 'Custom',
    customLinkProviderLabel: 'Custom Link Provider',
    corsproxy: {
      label: 'CORS Proxy',
      hint: 'Only change this if there are continuous issues with feed fetching!',
    },
  },
};
