import orderBy from 'lodash.orderby';
import find from 'lodash.find';

import * as types from './mutation-types';

import database from '../modules/database';
import { loadFeed, getChannelFromFeed, getVideoFromFeedEntry } from '../modules/feed';
import fuse from '../modules/search';

export default {
  toggleDrawer({ commit }) {
    commit(types.TOGGLE_DRAWER);
  },

  async getChannels({ commit }) {
    return new Promise((resolve) => {
      database.channels.toArray().then((result) => {
        commit(types.GET_CHANNELS, result);
        resolve();
      });
    });
  },

  selectChannel({ commit, dispatch }, index) {
    commit(types.SELECT_CHANNEL, index);
    dispatch('getVideos');
  },

  async addChannel({ commit, state }, feed) {
    const channel = getChannelFromFeed(feed);

    await database.channels.put(channel);
    if (find(state.channels, { id: channel.id }) === undefined) {
      commit(types.ADD_CHANNEL, channel);
    }
  },

  async removeChannel({ commit, dispatch, state }, index) {
    const channel = state.channels[index];

    await database.videos
      .where('channel')
      .equals(channel.id)
      .delete();

    await database.channels
      .where('id')
      .equals(channel.id)
      .delete();

    commit(types.REMOVE_CHANNEL, index);

    if ((state.selectedChannel - 1) === index) {
      dispatch('selectChannel', state.selectedChannel - 1);
    }

    if (state.channels.length === 0) {
      dispatch('selectChannel', 0);
    }

    dispatch('getVideos');
  },

  async addVideos({ dispatch }, feed) {
    feed.entry.forEach(async (entry) => {
      // eslint-disable-next-line no-console
      console.log(feed);
      const video = getVideoFromFeedEntry(entry, feed);

      await database.videos.put(video);
    });

    dispatch('getVideos');
  },

  async getVideos({ commit, dispatch, state }) {
    let videos;

    if (state.selectedChannel === 0) {
      videos = await database.videos.toArray();
    } else {
      const channelIndex = state.selectedChannel - 1;

      if (state.channels[channelIndex]) {
        videos = await database
          .videos
          .where('channel')
          .equals(state.channels[channelIndex].id)
          .toArray();
      }
    }

    if (videos) {
      commit(types.GET_VIDEOS, orderBy(videos, [state.sorting.property], [state.sorting.order]));
      dispatch('updateSearchIndex');
    }
  },

  updateSearchIndex({ commit, state }) {
    commit(types.UPDATE_SEARCH_INDEX, fuse(state.videos));
  },

  async getFeed({ commit, dispatch, state }, payload) {
    commit(types.SET_LOADING, true);

    try {
      const feed = await loadFeed(state.config.corsProxyUrl, payload.value, payload.type);
      dispatch('addChannel', feed);
      dispatch('addVideos', feed);
    } catch (e) {
      commit(types.ADD_ERROR_MESSAGE, 'There was an error loading the requested channel feed. Check for typos or the proper type setting!');
    }
    
    commit(types.SET_LOADING, false);
  },

  async refreshFeed({ dispatch, state }) {
    state.channels.forEach(async (channel) => {
      const feed = await loadFeed(state.config.corsProxyUrl, channel.id);
      dispatch('addVideos', feed);
    });
  },

  search({ commit, dispatch, state }, query) {
    if (query === '' || query === null) {
      dispatch('getVideos');
    } else {
      commit(types.SET_SEARCH_QUERY, query);
      commit(
        types.SEARCH,
        orderBy(state.fuse.search(query), [state.sorting.property], [state.sorting.order]),
      );
    }
  },

  updateSortingProperty({ commit, dispatch }, property) {
    commit(types.SET_SORTING_PROPERTY, property);
    dispatch('getVideos');
  },

  updateSortingOrder({ commit, dispatch }, order) {
    commit(types.SET_SORTING_ORDER, order);
    dispatch('getVideos');
  },

  updateConfig({ commit, state }, payload) {
    const config = { ...state.config, ...payload };

    commit(types.SET_CONFIG, config);
  },
};
