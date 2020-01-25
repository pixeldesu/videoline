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

  computed: mapState([
    'loading',
    'videos',
  ]),

  async created() {
    this.$store.dispatch('getChannels').then(() => {
      this.$store.dispatch('getVideos');
    });
  },
};
</script>

<style>
body {
  background-color: #1976d2;
}
</style>
