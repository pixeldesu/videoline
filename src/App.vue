<template>
  <v-app>
    <AppBar/>
    <AppNavigationDrawer/>

    <v-content>
      <v-container>
        <FeedContainer v-if="videos" :loading="loading" :entries="videos"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

import AppBar from './components/AppBar.vue';
import AppNavigationDrawer from './components/AppNavigationDrawer.vue';
import FeedContainer from './components/FeedContainer.vue';

export default {
  name: 'App',

  components: {
    AppBar,
    AppNavigationDrawer,
    FeedContainer,
  },

  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        if (this.$store.state.drawer !== value) {
          this.$store.dispatch('toggleDrawer');
        }
      },
    },
    searchQuery: {
      get() {
        return this.$store.state.searchQuery;
      },
      set(value) {
        this.$store.dispatch('search', value);
      },
    },
    selectedChannel: {
      get() {
        return this.$store.state.selectedChannel;
      },
      set(value) {
        this.$store.dispatch('selectChannel', value);
      },
    },
    ...mapState([
      'loading',
      'videos',
    ]),
  },

  async created() {
    this.$store.dispatch('getChannels');
    this.$store.dispatch('getVideos');
  },
};
</script>

<style>
body {
  background-color: #1976d2;
}
</style>
