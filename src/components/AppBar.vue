<template>
  <v-app-bar
    color="primary"
    >
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-spacer/>

    <v-text-field
      class="d-none d-sm-flex"
      flat
      rounded
      hide-details
      single-line
      variant="outlined"
      clearable
    />

    <v-btn
      prepend-icon="mdi-refresh"
      >
      Refresh
    </v-btn>
    <FeedDialog>
      <template v-slot:dialog-activator="{ props }">
        <v-btn
          prepend-icon="mdi-plus"
          v-bind="props"
          >
          Add Feed
        </v-btn>
      </template>
    </FeedDialog>
  </v-app-bar>
</template>

<script setup lang="ts">
import FeedDialog from './FeedDialog.vue'
</script>