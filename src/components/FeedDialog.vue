<template>
  <v-dialog
      v-model="dialog"
      width="500"
    >

    <template v-slot:activator="{ on }">
      <slot name="dialog-activator" v-bind:on="on"></slot>
    </template>

    <v-card>
      <v-card-title
        class="headline"
        primary-title
      >
        Add Channel Feed
      </v-card-title>

      <v-card-text>
        <v-radio-group
          v-model="feedType"
          row
          >
          <v-radio value="channel_id" label="Channel ID"></v-radio>
          <v-radio value="user" label="Username"></v-radio>
        </v-radio-group>
        <v-text-field
          class="pt-0"
          v-model="channelId"
          :prefix="feedPrefix[feedType]"
          :placeholder="feedPlaceholder[feedType]"
          ref="channel"
          persistent-hint
          :hint="feedHint[feedType]"
        />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="feedSubmit"
          :disabled="!channelId"
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
    feedType: 'channel_id',
    channelId: '',
    feedPrefix: {
      channel_id: 'https://youtube.com/channel/',
      user: 'https://youtube.com/user/',
    },
    feedHint: {
      channel_id: 'You can get the channel ID from a YouTube video page. The link on the username includes it.',
      user: 'This is the general format for URLs of YouTube channels. You can also get the username from the link on the avatar of a video uploader.',
    },
    feedPlaceholder: {
      channel_id: 'YouTube channel ID',
      user: 'YouTube channel username',
    },
  }),
  methods: {
    feedSubmit() {
      if (this.channelId) {
        this.$emit('feedSubmitted', {
          type: this.feedType,
          value: this.channelId,
        });

        this.dialog = false;
        this.channelId = '';
      }
    },
  },
  watch: {
    dialog(value) {
      if (value) {
        requestAnimationFrame(() => {
          this.$refs.channel.focus();
        });
      }
    },
  },
};
</script>
