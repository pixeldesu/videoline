import Dexie from 'dexie';

const database = new Dexie('videoline');

database.version(1).stores({
  channels: '&id,name',
  videos: '&id,title,description,author,channel,views,thumbnail,published,updated',
});

export default database;
