<template>
  <v-dialog
      v-model="dialog"
      width="500"
    >
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        <v-icon left>mdi-plus</v-icon> Add Feed
      </v-btn>
    </template>

    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Add Channel Feed
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="channelId" prefix="https://youtube.com/channel/" placeholder="YouTube channel ID"/>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="$emit('feedSubmitted', channelId)"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'FeedDialog',
  data: () => ({
    dialog: false,
    channelId: '',
  }),
};
</script>
