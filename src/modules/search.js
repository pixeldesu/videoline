import Fuse from 'fuse.js';

export default function createFuse(documents) {
  return new Fuse(documents, { keys: ['title'], threshold: 0.2 });
}
