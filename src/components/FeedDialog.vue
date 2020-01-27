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
        class="headline grey lighten-2"
        primary-title
      >
        {{ $t('Add channel feed') }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="channelId"
          prefix="https://youtube.com/channel/"
          :placeholder="$t('YouTube channel ID')"
          ref="channel"
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
          {{ $t('Add') }}
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
  methods: {
    feedSubmit() {
      if (this.channelId) {
        this.$emit('feedSubmitted', this.channelId);
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
