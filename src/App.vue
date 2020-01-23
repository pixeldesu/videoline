<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <div class="d-flex align-center">
        <v-toolbar-title>videoline</v-toolbar-title>
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
          class="d-none d-sm-flex"
          text
          @click="refreshFeed"
        >
          <v-icon left>mdi-refresh</v-icon> Refresh
        </v-btn>
        <FeedDialog @feedSubmitted="getFeed">
          <template v-slot:dialog-activator="{ on }">
            <v-btn class="d-none d-sm-flex" text v-on="on">
              <v-icon left>mdi-plus</v-icon> Add Feed
            </v-btn>
          </template>
        </FeedDialog>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
    >
      <v-list dense class="d-block d-sm-none">
        <v-list-item inactive>
          <v-text-field
            solo-inverted
            flat
            hide-details
            single-line
            label="Search"
            v-model="searchQuery"
            clearable
          />
        </v-list-item>
      </v-list>

      <v-list dense>
        <v-subheader>CHANNELS</v-subheader>
        <v-list-item-group v-model="selectedChannel" color="primary">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>All channels</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="(channel, index) in channels" :key="channel.id">
            <v-list-item-content>
              <v-list-item-title v-text="channel.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="removeChannel(index)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-list dense class="d-block d-sm-none">
        <v-subheader>FEEDS</v-subheader>
        <v-list-item @click="refreshFeed">
          <v-list-item-icon>
            <v-icon>mdi-refresh</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Refresh
          </v-list-item-content>
        </v-list-item>
        <FeedDialog @feedSubmitted="getFeed">
          <template v-slot:dialog-activator="{ on }">
            <v-list-item v-on="on">
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                Add Feed
              </v-list-item-content>
            </v-list-item>
          </template>
        </FeedDialog>
      </v-list>

    </v-navigation-drawer>

    <v-content>
      <v-container>
        <FeedContainer v-if="videos" :loading="loading" :entries="videos"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import FeedContainer from './components/FeedContainer.vue';
import FeedDialog from './components/FeedDialog.vue';

export default {
  name: 'App',

  components: {
    FeedContainer,
    FeedDialog,
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
      'channels',
      'fuse',
      'loading',
      'videos',
    ]),
  },

  methods: {
    ...mapActions([
      'addChannel',
      'addVideos',
      'getFeed',
      'getVideos',
      'refreshFeed',
      'removeChannel',
      'toggleDrawer',
    ]),
  },

  async created() {
    this.$store.dispatch('getChannels');
    this.$store.dispatch('getVideos');
  },

  watch: {
    selectedChannel(value, oldValue) {
      if (value === undefined) {
        this.selectedChannel = oldValue - 1;
      } else if (value < 0 || oldValue < 0) {
        this.selectedChannel = 0;
      } else {
        const channelIndex = value - 1;

        if (this.channels[channelIndex] === undefined) {
          this.selectedChannel = value - 1;
        }
      }
    },
  },
};
</script>

<style>
body {
  background-color: #1976d2;
}
</style>
