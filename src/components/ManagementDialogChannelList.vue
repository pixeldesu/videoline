<template>
  <v-list>
    <v-list-item-group color="primary">
      <v-list-item v-for="(channel, index) in channels" :key="channel.id">
        <v-list-item-content>
          <v-list-item-title v-text="channel.name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="removeChannel(index)">
                <v-list-item-title class="red--text">
                  Remove
                </v-list-item-title>
              </v-list-item>
              <v-divider/>
              <v-subheader>
                ADD TO COLLECTION
              </v-subheader>
              <v-list-item v-for="collection in collections" :key="collection.id">
                <v-list-item-title>
                  {{ collection.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ManagementDialogChannelList',

  computed: {
    ...mapState([
      'collections',
      'channels',
    ]),
  },

  methods: {
    ...mapActions([
      'removeChannel',
    ]),
  },
};
</script>
