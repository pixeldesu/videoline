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
        <v-btn text @click="refreshFeed">
          <v-icon left>mdi-refresh</v-icon> Refresh
        </v-btn>
        <FeedDialog @feedSubmitted="getFeed"/>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
    >
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

import FeedContainer from './components/FeedContainer';
import FeedDialog from './components/FeedDialog';

import database from './modules/database';
import fuse from './modules/search';
import loadFeed from './modules/feed';

export default {
  name: 'App',

  components: {
    FeedContainer,
    FeedDialog
  },

  data: () => ({
    selectedChannel: 0,
    drawer: false,
    loading: false,
    channels: [],
    videos: [],
    fuse: null,
    searchQuery: ""
  }),

  methods: {
    refreshFeed: async function () {
      let that = this;

      this.channels.forEach(async function (channel) {
        let feed = await loadFeed(channel.id);
        that.addVideos(feed);
      })
    },
    getFeed: async function (channelID) {
      this.loading = true;
      let feed = await loadFeed(channelID);
      this.loading = false;
      this.addChannel(feed);
      this.addVideos(feed);
    },
    addChannel: async function (feed) {
      let channel = {
        name: feed.author[0].name[0],
        id: feed['yt:channelId'][0]
      };

      this.channels.push(channel);
      await database.channels.put(channel);
    },
    addVideos: async function (feed) {
      let that = this;

      feed.entry.forEach(async function (entry) {
        let video = {
          id: entry['yt:videoId'][0],
          title: entry.title[0],
          description: entry['media:group'][0]['media:description'][0],
          author: feed.author[0].name[0],
          channel: feed['yt:channelId'][0],
          views: entry['media:group'][0]['media:community'][0]['media:statistics'][0]['$']['views'],
          thumbnail: entry['media:group'][0]['media:thumbnail'][0]['$']['url'],
          published: entry['published'][0],
          updated: entry['updated'][0]
        };

        if (find(that.videos, { 'channel': video.channel }) === undefined) {
          await database.videos.put(video);
        }
      })

      this.getVideos();
    },
    getVideos: async function () {
      let videos;

      if (this.selectedChannel === 0) {
        videos = await database.videos.toArray();
      } else {
        let channelIndex = this.selectedChannel - 1;

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
    removeChannel: async function (index) {
      let channel = this.channels[index];

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
        this.selectedChannel = this.selectedChannel - 1;
      }

      if (this.channels.length === 0) {
        this.selectedChannel = 0;
      }

      this.getVideos();
    },
    search: function () {
      this.videos = orderBy(this.fuse.search(this.searchQuery), ['published'], ['desc']);
    }
  },

  created: async function () {
    this.channels = await database.channels.toArray();
    this.getVideos();
  },

  watch: {
    selectedChannel: function (value, oldValue) {
      if (value === undefined) {
        this.selectedChannel = oldValue - 1;
      }
      else if (value < 0 || oldValue < 0) {
        this.selectedChannel = 0;
      }
      else {
        let channelIndex = value - 1;

        if (this.channels[channelIndex] === undefined) {
          this.selectedChannel = value - 1;
        }
      }

      this.getVideos();
    },
    searchQuery: function (value) {
      if (value === '' || value === null) {
        this.getVideos();
      } else {
        this.search();
      }
    }
  }
};
</script>
