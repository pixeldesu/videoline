<template>
  <v-navigation-drawer
      app
      clipped
      class="safe-area-ios"
      v-model="drawer"
    >
    <v-list dense class="d-block d-sm-none">
      <v-list-item inactive>
        <v-text-field
          solo-inverted
          flat
          hide-details
          single-line
          label="Search"
          v-model="searchQuery"
          clearable
        />
      </v-list-item>
    </v-list>

    <v-tabs grow>
      <v-tab>
        CHANNELS
      </v-tab>
      <v-tab>
        COLLECTIONS
      </v-tab>
      <v-tab-item>
        <SidebarChannelList/>
      </v-tab-item>
      <v-tab-item>
        <SidebarCollectionList/>
      </v-tab-item>
    </v-tabs>

    <template v-slot:append>
      <v-divider/>
      <v-list dense>
        <SettingsDialog/>
        <AboutDialog/>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import AboutDialog from './AboutDialog.vue';
import SettingsDialog from './SettingsDialog.vue';
import SidebarChannelList from './SidebarChannelList.vue';
import SidebarCollectionList from './SidebarCollectionList.vue';

export default {
  name: 'Sidebar',
  components: {
    AboutDialog,
    SettingsDialog,
    SidebarChannelList,
    SidebarCollectionList,
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        if (this.$store.state.drawer !== value) {
          this.$store.dispatch('toggleDrawer');
        }
      },
    },
    searchQuery: {
      get() {
        return this.$store.state.searchQuery;
      },
      set(value) {
        this.$store.dispatch('search', value);
      },
    },
  },
};
</script>
