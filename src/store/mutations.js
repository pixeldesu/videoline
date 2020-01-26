import * as types from './mutation-types';

export default {
  [types.TOGGLE_DRAWER](state) {
    state.drawer = !state.drawer;
  },
  [types.GET_CHANNELS](state, channels) {
    state.channels = channels;
  },
  [types.SELECT_CHANNEL](state, index) {
    state.selectedChannel = index;
  },
  [types.ADD_CHANNEL](state, channel) {
    state.channels.push(channel);
  },
  [types.REMOVE_CHANNEL](state, index) {
    state.channels.splice(index, 1);
  },
  [types.GET_VIDEOS](state, videos) {
    state.videos = videos;
  },
  [types.UPDATE_SEARCH_INDEX](state, fuse) {
    state.fuse = fuse;
  },
  [types.SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [types.SEARCH](state, results) {
    state.videos = results;
  },
  [types.SET_SEARCH_QUERY](state, query) {
    state.searchQuery = query;
  },
  [types.SET_SORTING_PROPERTY](state, property) {
    state.sorting.property = property;
  },
  [types.SET_SORTING_ORDER](state, order) {
    state.sorting.order = order;
  },
};
