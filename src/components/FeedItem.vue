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
        {{ entry.views | thousands_sep }} {{ $t('views') }}
      </v-chip>
    </v-img>
    <v-card-title class="subtitle-2 text-truncate d-block">{{ entry.title }}</v-card-title>
    <v-card-subtitle>{{ entry.author }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: 'FeedItem',
  props: ['entry'],
  computed: {
    link() {
      return `https://www.invidio.us/watch?v=${this.entry.id}`;
    },
  },
  filters: {
    thousands_sep(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>
