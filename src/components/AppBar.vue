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
    <v-btn
      prepend-icon="mdi-plus"
      >
      Add Feed
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">

</script>