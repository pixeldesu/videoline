import * as xml2js from 'xml2js';

export default function loadFeed(corsProxyUrl, channelID) {
  return fetch(`${corsProxyUrl}https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`).then((response) => response.text()).then((xml) => xml2js.parseStringPromise(xml)).then((result) => result.feed);
}
