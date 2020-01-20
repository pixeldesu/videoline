<template>
  <v-container>
    <v-row v-if="loading">
      <v-col md="3" v-for="n in 12" v-bind:key="n">
        <v-skeleton-loader
          type="card"
        />
      </v-col>
    </v-row>
    <v-row v-else-if="!loading && entries">
      <v-col md="3" v-for="entry in entries" v-bind:key="entry.id">
        <FeedItem :entry="entry"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FeedItem from './FeedItem.vue';

export default {
  name: 'FeedContainer',
  props: [
    'loading',
    'entries',
  ],
  components: {
    FeedItem,
  },
};
</script>
