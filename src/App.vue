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
import orderBy from 'lodash.orderby';
import find from 'lodash.find';

import FeedContainer from './components/FeedContainer.vue';
import FeedDialog from './components/FeedDialog.vue';

import database from './modules/database';
import fuse from './modules/search';
import loadFeed from './modules/feed';

export default {
  name: 'App',

  components: {
    FeedContainer,
    FeedDialog,
  },

  data: () => ({
    selectedChannel: 0,
    drawer: false,
    loading: false,
    channels: [],
    videos: [],
    fuse: null,
    searchQuery: '',
  }),

  methods: {
    async refreshFeed() {
      const that = this;

      this.channels.forEach(async (channel) => {
        const feed = await loadFeed(channel.id);
        that.addVideos(feed);
      });
    },
    async getFeed(channelID) {
      this.loading = true;
      const feed = await loadFeed(channelID);
      this.loading = false;
      this.addChannel(feed);
      this.addVideos(feed);
    },
    async addChannel(feed) {
      const channel = {
        name: feed.author[0].name[0],
        id: feed['yt:channelId'][0],
      };

      if (find(this.channels, { id: channel.id }) === undefined) {
        this.channels.push(channel);
        await database.channels.put(channel);
      }
    },
    async addVideos(feed) {
      const that = this;

      feed.entry.forEach(async (entry) => {
        const video = {
          id: entry['yt:videoId'][0],
          title: entry.title[0],
          description: entry['media:group'][0]['media:description'][0],
          author: feed.author[0].name[0],
          channel: feed['yt:channelId'][0],
          views: entry['media:group'][0]['media:community'][0]['media:statistics'][0].$.views,
          thumbnail: entry['media:group'][0]['media:thumbnail'][0].$.url,
          published: entry.published[0],
          updated: entry.updated[0],
        };

        if (find(that.videos, { id: video.id }) === undefined) {
          await database.videos.put(video);
        }
      });

      this.getVideos();
    },
    async getVideos() {
      let videos;

      if (this.selectedChannel === 0) {
        videos = await database.videos.toArray();
      } else {
        const channelIndex = this.selectedChannel - 1;

        if (this.channels[channelIndex]) {
          videos = await database
            .videos
            .where('channel')
            .equals(this.channels[channelIndex].id)
            .toArray();
        }
      }

      if (videos) {
        this.fuse = fuse(videos);
        this.videos = orderBy(videos, ['published'], ['desc']);
      }
    },
    async removeChannel(index) {
      const channel = this.channels[index];

      await database.videos
        .where('channel')
        .equals(channel.id)
        .delete();

      await database.channels
        .where('id')
        .equals(channel.id)
        .delete();

      this.channels.splice(index, 1);

      if ((this.selectedChannel - 1) === index) {
        this.selectedChannel -= 1;
      }

      if (this.channels.length === 0) {
        this.selectedChannel = 0;
      }

      this.getVideos();
    },
    search() {
      this.videos = orderBy(this.fuse.search(this.searchQuery), ['published'], ['desc']);
    },
  },

  async created() {
    this.channels = await database.channels.toArray();
    this.getVideos();
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

      this.getVideos();
    },
    searchQuery(value) {
      if (value === '' || value === null) {
        this.getVideos();
      } else {
        this.search();
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