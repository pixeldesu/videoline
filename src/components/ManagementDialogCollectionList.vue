<template>
  <div>
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item v-for="(collection) in collections" :key="collection.id">
          <v-list-item-content>
            <v-list-item-title v-text="collection.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="removeCollection(collection.id)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-card-text>
      <v-text-field v-model="collectionName">
        <template v-slot:append-outer>
          <v-btn icon @click="addCollection(collectionName); collectionName = ''">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-card-text>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ManagementDialogCollectionList',

  data: () => ({
    collectionName: '',
  }),

  computed: {
    ...mapState([
      'collections',
    ]),
  },

  methods: {
    ...mapActions([
      'addCollection',
      'removeCollection',
    ]),
  },
};
</script>
