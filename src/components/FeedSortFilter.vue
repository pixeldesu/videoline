<template>
  <v-row align="center">
    <v-spacer/>
    <v-col class="d-flex" cols="6" sm="2">
      <v-select
          dense
          v-model="selectedProperty"
          :items="properties"
          label="Sort by"
        >
      </v-select>
    </v-col>
    <v-col class="d-flex" cols="6" sm="2">
      <v-select
          dense
          v-model="selectedOrder"
          :items="orderings"
          label="Order"
        >
      </v-select>
    </v-col>
  </v-row>
</template>

<script>
import { ALLOWED_PROPERTIES, ALLOWED_ORDERINGS } from '../modules/sorting';

export default {
  name: 'FeedSortFilter',

  data: () => ({
    properties: ALLOWED_PROPERTIES,
    orderings: ALLOWED_ORDERINGS,
  }),

  computed: {
    selectedProperty: {
      get() {
        return this.$store.state.sorting.property;
      },

      set(value) {
        this.$store.dispatch('updateSortingProperty', value);
      },
    },
    selectedOrder: {
      get() {
        return this.$store.state.sorting.order;
      },

      set(value) {
        this.$store.dispatch('updateSortingOrder', value);
      },
    },
  },
};
</script>
