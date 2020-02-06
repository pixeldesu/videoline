<template>
  <v-app-bar
      app
      clipped-left
      class="safe-area-ios vl-header"
      :height="(isIos ? 'auto' : undefined)"
      dark
    >
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <div class="d-flex align-center">
      <img class="vl-logo" src="../assets/logo.png"/>
    </div>

    <v-spacer></v-spacer>

    <v-text-field
      class="d-none d-sm-flex"
      flat
      hide-details
      single-line
      outlined
      label="Search"
      v-model="searchQuery"
      clearable
    />

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        text
        @click="refreshFeed"
      >
        <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-refresh</v-icon>
        <span class="d-none d-sm-inline">Refresh</span>
      </v-btn>
      
      <FeedDialog @feedSubmitted="getFeed">
        <template v-slot:dialog-activator="{ on }">
          <v-btn text v-on="on">
            <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-plus</v-icon>
            <span class="d-none d-sm-inline">Add Feed</span>
          </v-btn>
        </template>
      </FeedDialog>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex';

import FeedDialog from './FeedDialog.vue';

export default {
  name: 'AppBar',
  components: {
    FeedDialog,
  },
  computed: {
    isIos() {
      return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    },
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
  },
  methods: mapActions([
    'getFeed',
    'refreshFeed',
  ]),
};
</script>

<style>
.vl-header {
  background: linear-gradient(0deg, rgba(92,107,192,1) 0%, rgba(49,27,146,1) 100%);
}

.vl-logo {
  height: 36px;
  width: auto;
}
</style>
