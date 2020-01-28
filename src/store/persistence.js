import VuexPersistence from 'vuex-persist';

const ALLOWED_MUTATIONS = [
  'TOGGLE_DRAWER',
  'SELECT_CHANNEL',
  'SET_CONFIG',
  'SET_SORTING_PROPERTY',
  'SET_SORTING_ORDER',
];

export default new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    config: state.config,
    drawer: state.drawer,
    selectedChannel: state.selectedChannel,
    sorting: state.sorting,
  }),
  filter: (mutation) => ALLOWED_MUTATIONS.includes(mutation.type),
});
