<template>
  <v-card :href="link" target="_blank" rel="noopener noreferrer">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="entry.thumbnail"
    >
      <v-chip
        class="ma-2 float-right"
        color="grey darken-4 white--text transparent"
        label
      >
        {{ chip_content }}
      </v-chip>
    </v-img>
    <v-card-title class="subtitle-2 text-truncate d-block">{{ entry.title }}</v-card-title>
    <v-card-subtitle>{{ entry.author }}</v-card-subtitle>
  </v-card>
</template>

<script>
import * as relativeDate from 'relative-date';

export default {
  name: 'FeedItem',
  props: ['entry'],
  computed: {
    link() {
      return `${this.$store.getters.videoUrl}${this.entry.id}`;
    },
    chip_content() {
      const viewCountThousands = this.entry.views.toString(10).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return {
        published: relativeDate(Date.parse(this.entry.published)),
        views: this.$tc('feedItem.views', this.entry.views, { count: viewCountThousands }),
      }[this.$store.state.config.showInChip];
    },
  },
};
</script>
