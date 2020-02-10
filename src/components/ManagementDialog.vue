<template>
  <v-dialog
      v-model="dialog"
      width="500"
      scrollable
    >

    <template v-slot:activator="{ on }">
      <v-list-item v-on="on">
        <v-list-item-icon>
          <v-icon>mdi-view-list</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Manage</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card>
      <v-card-title
        class="headline"
        primary-title
      >
        Manage Channels / Collections
      </v-card-title>

      <v-tabs grow>
        <v-tab>
          CHANNELS
        </v-tab>
        <v-tab>
          COLLECTIONS
        </v-tab>

        <v-tab-item>
          <ManagementDialogChannelList/>
        </v-tab-item>

        <v-tab-item>
          <ManagementDialogCollectionList/>
        </v-tab-item>
      </v-tabs>

      <v-divider/>

      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          text
          @click="dialog = !dialog"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import ManagementDialogChannelList from './ManagementDialogChannelList.vue';
import ManagementDialogCollectionList from './ManagementDialogCollectionList.vue';

export default {
  name: 'ManagementDialog',

  components: {
    ManagementDialogChannelList,
    ManagementDialogCollectionList,
  },

  data: () => ({
    dialog: false,
  }),

  computed: {
    ...mapState([
      'collections',
      'channels',
    ]),
  },

  methods: {
    ...mapActions([
      'addCollection',
      'removeCollection',
      'removeChannel',
    ]),
  },
};
</script>
