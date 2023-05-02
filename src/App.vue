<script setup lang="ts">
import AppBar from './components/AppBar.vue'
import AppNavigationDrawer from './components/AppNavigationDrawer.vue'
import FeedContainer from './components/FeedContainer.vue'
</script>

<template>
  <v-layout>
    <AppBar/>
    <AppNavigationDrawer/>

    <v-main>
      <v-container>
        <FeedContainer/>
      </v-container>
    </v-main>
  </v-layout>
</template>

<style scoped>

</style>
