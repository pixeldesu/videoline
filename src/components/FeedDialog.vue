<template>
  <v-dialog
    width="500"
    >

    <template v-slot:activator="{ props }">
      <slot name="dialog-activator" v-bind:props="props"></slot>
    </template>

    <v-card>
      <v-card-title
        class="headline"
        primary-title
      >
        Add Channel Feed
      </v-card-title>

      <v-card-text>
        <v-text-field
          class="pt-0"
          prefix="https://youtube.com/channel/"
          placeholder="YouTube Channel ID"
          ref="channel"
          persistent-hint
          hint="You can get the channel ID from a YouTube video page. The link on the username includes it."
        />

        <v-divider/>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            variant="text"
            >
            Add
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

</script>