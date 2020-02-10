<template>
  <v-app>
    <AppBar/>
    <Sidebar/>

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
import FeedContainer from './components/FeedContainer.vue';
import FeedSortFilter from './components/FeedSortFilter.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',

  components: {
    AppBar,
    FeedContainer,
    FeedSortFilter,
    Sidebar,
  },

  computed: mapState([
    'config',
    'errorMessages',
    'loading',
    'videos',
  ]),

  async created() {
    this.$store.dispatch('getCollections');
    this.$store.dispatch('getChannels').then(() => {
      this.$store.dispatch('getVideos');
    });

    this.$vuetify.theme.dark = this.$store.state.config.darkTheme;
    this.$store.watch(
      (state) => state.config.darkTheme,
      (value) => { this.$vuetify.theme.dark = value; },
    );
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
