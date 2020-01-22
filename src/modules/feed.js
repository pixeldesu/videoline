import * as xml2js from 'xml2js';

export default function loadFeed(channelID) {
  return fetch(`https://cors-anywhere.herokuapp.com/https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`)
    .then((response) => response.text())
    .then((xml) => xml2js.parseStringPromise(xml))
    .then((result) => result.feed)
    .catch(() => {
      throw new Error(`Error loading channel: <code>${channelID}</code>. Have you mistaken the username with the channel ID?`);
    });
}
