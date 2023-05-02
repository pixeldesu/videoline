<template>
  <v-row v-if="loading">
    <v-col md="3" v-for="n in 12" v-bind:key="n">
      <FeedItem/>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FeedItem from './FeedItem.vue'

const loading = ref(true)
</script>