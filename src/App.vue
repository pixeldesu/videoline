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
    'config',
    'errorMessages',
    'loading',
    'videos',
  ]),


  async created() {
    const self = this;

    this.$store.dispatch('getChannels').then(() => {
      this.$store.dispatch('getVideos');
    });

    function respectTheme() {
      let { darkTheme } = self.$store.state.config;
      if (darkTheme === 0) {
        darkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      self.$vuetify.theme.dark = darkTheme;
    }

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addListener(respectTheme);
    }

    this.$store.watch(
      (state) => state.config.darkTheme,
      respectTheme,
    );

    respectTheme();
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
