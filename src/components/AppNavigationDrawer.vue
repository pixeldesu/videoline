<template>
  <v-navigation-drawer>
    <v-list
      :lines="false"
      nav
        >
        <v-list-subheader
          class="text-overline"
          >
          Channels
        </v-list-subheader>
        <v-list-item value="all">
          <v-list-item-title v-text="`All channels`"></v-list-item-title>
        </v-list-item>
      </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">

</script>