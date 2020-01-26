<template>
  <v-row align="center">
    <v-spacer/>
    <v-col class="d-flex" cols="6" sm="2">
      <v-select
          dense
          v-model="selectedProperty"
          :items="ALLOWED_PROPERTIES"
          label="Sort by"
        >
      </v-select>
    </v-col>
    <v-col class="d-flex" cols="6" sm="2">
      <v-select
          dense
          v-model="selectedOrder"
          :items="ALLOWED_ORDERINGS"
          label="Order"
        >
      </v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'FeedSortFilter',

  data: () => ({
    ALLOWED_PROPERTIES: [
      {
        text: 'Publish Date',
        value: 'published',
      },
      {
        text: 'Views',
        value: 'views',
      },
    ],
    ALLOWED_ORDERINGS: [
      {
        text: 'Ascending',
        value: 'asc',
      },
      {
        text: 'Descending',
        value: 'desc',
      },
    ],
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
