<template>
  <v-dialog
      v-model="dialog"
      width="500"
    >

    <template v-slot:activator="{ on }">
      <v-list-item v-on="on">
        <v-list-item-icon>
          <v-icon>mdi-settings</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card>
      <v-card-title
        class="headline"
        primary-title
      >
        Settings
      </v-card-title>
      
      <v-card-text>
        <v-switch v-model="darkTheme" label="Dark Theme"></v-switch>
        Video Link Provider:
        <v-radio-group class="mt-0" v-model="videoLinkProvider">
          <v-radio label="YouTube" value="https://youtube.com/watch?v="/>
          <v-radio label="invidio.us" value="https://invidio.us/watch?v="/>
          <v-radio label="Custom" value="custom"/>
        </v-radio-group>
        <v-text-field
            label="Custom Link Provider"
            placeholder="https://my-cool-website.com/watch?v="
            v-model="customVideoLinkProvider"
            v-if="videoLinkProvider === 'custom'"
          >
        </v-text-field>
        <v-text-field
            label="CORS Proxy"
            placeholder="https://a-cool-proxy.com/"
            hint="Only change this if there are continuous issues with feed fetching!"
            persistent-hint
            v-model="corsProxyUrl"
          >
        </v-text-field>
      </v-card-text>

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
export default {
  name: 'SettingsDialog',

  data: () => ({
    dialog: false,
  }),

  computed: {
    darkTheme: {
      get() {
        return this.$store.state.config.darkTheme;
      },

      set(value) {
        this.$store.dispatch('updateConfig', { darkTheme: value });
      },
    },
    corsProxyUrl: {
      get() {
        return this.$store.state.config.corsProxyUrl;
      },

      set(value) {
        this.$store.dispatch('updateConfig', { corsProxyUrl: value });
      },
    },
    videoLinkProvider: {
      get() {
        return this.$store.state.config.videoLinkProvider;
      },

      set(value) {
        this.$store.dispatch('updateConfig', { videoLinkProvider: value });
      },
    },
    customVideoLinkProvider: {
      get() {
        return this.$store.state.config.customVideoLinkProvider;
      },

      set(value) {
        this.$store.dispatch('updateConfig', { customVideoLinkProvider: value });
      },
    },
  },
};
</script>
