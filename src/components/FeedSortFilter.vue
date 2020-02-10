<template>
  <v-row align="center">
    <v-spacer/>
    <v-col class="d-flex" cols="6" sm="2">
      <v-select
          dense
          v-model="selectedProperty"
          :items="properties"
          :label="$t('feedSortFilter.sortBy')"
        >
      </v-select>
    </v-col>
    <v-col class="d-flex" cols="6" sm="2">
      <v-select
          dense
          v-model="selectedOrder"
          :items="orderings"
          :label="$t('feedSortFilter.order')"
        >
      </v-select>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'FeedSortFilter',
  
  data: (vm) => ({
    properties: [
      {
        text: vm.$t('feedSortFilter.allowedProperties.publishedDate'),
        value: 'published',
      },
      {
        text: vm.$t('feedSortFilter.allowedProperties.views'),
        value: 'views',
      },
      {
        text: vm.$t('feedSortFilter.allowedProperties.rating'),
        value: 'rating',
      },
    ],
    orderings: [
      {
        text: vm.$t('feedSortFilter.allowedOrderings.ascending'),
        value: 'asc',
      },
      {
        text: vm.$t('feedSortFilter.allowedOrderings.ascending'),
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
