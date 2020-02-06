import Dexie from 'dexie';

const database = new Dexie('videoline');

database.version(1).stores({
  channels: '&id,name',
  videos: '&id,title,description,author,channel,views,thumbnail,published,updated',
});

database.version(2).stores({
  channels: '&id,name',
  videos: '&id,title,description,author,channel,views,thumbnail,published,updated',
}).upgrade((trans) => trans.videos.toCollection().modify((video) => {
  video.views = parseInt(video.views, 10);
}));

database.version(3).stores({
  channels: '&id,name',
  videos: '&id,title,description,author,channel,views,rating,thumbnail,published,updated',
}).upgrade((trans) => trans.videos.toCollection().modify((video) => {
  video.rating = 0;
}));

export default database;
