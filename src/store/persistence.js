import VuexPersistence from 'vuex-persist';

const ALLOWED_MUTATIONS = [
  'TOGGLE_DRAWER',
  'SELECT_CHANNEL',
];

export default new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    drawer: state.drawer,
    selectedChannel: state.selectedChannel,
  }),
  filter: (mutation) => ALLOWED_MUTATIONS.includes(mutation.type),
});
