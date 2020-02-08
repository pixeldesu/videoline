<template>
  <v-list dense>
    <v-list-item-group v-model="selectedChannel" color="primary">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>All channels</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="(channel, index) in channels" :key="channel.id">
        <v-list-item-content>
          <v-list-item-title v-text="channel.name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="removeChannel(index)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SidebarChannelList',

  computed: {
    selectedChannel: {
      get() {
        return this.$store.state.selectedChannel;
      },
      set(value) {
        this.$store.dispatch('selectChannel', value);
      },
    },
    ...mapState([
      'channels',
    ]),
  },

  methods: mapActions([
    'removeChannel',
  ]),

  watch: {
    selectedChannel(value, oldValue) {
      if (value === undefined) {
        this.selectedChannel = oldValue - 1;
      } else if (value < 0 || oldValue < 0) {
        this.selectedChannel = 0;
      } else {
        const channelIndex = value - 1;

        if (this.channels[channelIndex] === undefined) {
          this.selectedChannel = value - 1;
        }
      }
    },
  },
};
</script>
