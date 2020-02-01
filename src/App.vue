<template>
  <v-app>
    <AppBar/>
    <AppNavigationDrawer/>

    <v-content>
      <v-container class="safe-area-ios-container">
        <FeedSortFilter/>
        <FeedContainer v-if="videos" :loading="loading" :entries="videos"/>
        <v-snackbar
          bottom
          color="error"
          value="true"
          v-for="(errorMessage, index) in errorMessages" :key="index"
          >
          {{ errorMessage }}
        </v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

import AppBar from './components/AppBar.vue';
import AppNavigationDrawer from './components/AppNavigationDrawer.vue';
import FeedContainer from './components/FeedContainer.vue';
import FeedSortFilter from './components/FeedSortFilter.vue';

export default {
  name: 'App',

  components: {
    AppBar,
    AppNavigationDrawer,
    FeedContainer,
    FeedSortFilter,
  },

  computed: mapState([
    'errorMessages',
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
.safe-area-ios {
  padding-top: env(safe-area-inset-top);
}

.safe-area-ios-container {
  padding-top: calc(2.5 * env(safe-area-inset-top));
}
</style>
