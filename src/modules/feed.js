import * as xml2js from 'xml2js';

export function loadFeed(corsProxyUrl, channelID, type = 'channel_id') {
  return fetch(`${corsProxyUrl}https://www.youtube.com/feeds/videos.xml?${type}=${channelID}`).then((response) => response.text()).then((xml) => xml2js.parseStringPromise(xml)).then((result) => result.feed);
}

export function getVideoFromFeedEntry(entry, feed) {
  return {
    id: entry['yt:videoId'][0],
    title: entry.title[0],
    description: entry['media:group'][0]['media:description'][0],
    author: feed.author[0].name[0],
    channel: feed['yt:channelId'][0],
    rating: parseFloat(entry['media:group'][0]['media:community'][0]['media:starRating'][0].$.average),
    views: parseInt(entry['media:group'][0]['media:community'][0]['media:statistics'][0].$.views, 10),
    thumbnail: entry['media:group'][0]['media:thumbnail'][0].$.url,
    published: entry.published[0],
    updated: entry.updated[0],
  };
}

export function getChannelFromFeed(feed) {
  return {
    name: feed.author[0].name[0],
    id: feed['yt:channelId'][0],
  };
}
