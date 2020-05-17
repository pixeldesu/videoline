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
          <v-list-item-title>{{ $t('settingsDialog.title') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card>
      <v-card-title
        class="headline"
        primary-title
      >
        {{ $t('settingsDialog.headline') }}
      </v-card-title>
      
      <v-card-text>
        {{ $t('settingsDialog.theme') }}:
        <v-radio-group class="mt-0" v-model="darkTheme">
          <v-radio :value="0" :label="$t('settingsDialog.systemtheme')"/>
          <v-radio :value="false" :label="$t('settingsDialog.lighttheme')"/>
          <v-radio :value="true" :label="$t('settingsDialog.darktheme')"/>
        </v-radio-group>

        {{ $t('settingsDialog.videoLinkProviderTitle') }}:
        <v-radio-group class="mt-0" v-model="videoLinkProvider">
          <v-radio label="YouTube" value="https://youtube.com/watch?v="/>
          <v-radio label="invidio.us" value="https://invidio.us/watch?v="/>
          <v-radio :label="$t('settingsDialog.radioCustomLabel')" value="custom"/>
        </v-radio-group>

        {{ $t('settingsDialog.showInChipTitle') }}:
        <v-radio-group class="mt-0" v-model="showInChip">
          <v-radio :label="$t('settingsDialog.showViewsInChip')" value="views"/>
          <v-radio :label="$t('settingsDialog.showPublishedInChip')" value="published"/>
        </v-radio-group>

        <v-text-field
            :label="$t('settingsDialog.customLinkProviderLabel')"
            placeholder="https://my-cool-website.com/watch?v="
            v-model="customVideoLinkProvider"
            v-if="videoLinkProvider === 'custom'"
          >
        </v-text-field>
        <v-text-field
            :label="$t('settingsDialog.corsproxy.label')"
            placeholder="https://a-cool-proxy.com/"
            :hint="$t('settingsDialog.corsproxy.hint')"
            persistent-hint
            v-model="corsProxyUrl"
          >
        </v-text-field>
      </v-card-text>

      <v-card-text>
        <a target="_blank" href="https://www.youtube.com/subscription_manager?action_takeout=1">YouTube OPML</a> import:
        <v-file-input
            v-model="opmlImport"
            hint="Add all the feeds from a YouTube OPML export to your VideoLine subscriptions."
            persistent-hint
            accept="application/xml"
          >
        </v-file-input>
      </v-card-text>

      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          text
          @click="dialog = !dialog"
        >
          {{ $t('buttonText.close') }}
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
    showInChip: {
      get() {
        return this.$store.state.config.showInChip;
      },

      set(value) {
        this.$store.dispatch('updateConfig', { showInChip: value });
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
    opmlImport: {
      get() {
        return [];
      },

      set(value) {
        this.$store.dispatch('importOpml', { opmlImport: value });
      },
    },
  },
};
</script>
