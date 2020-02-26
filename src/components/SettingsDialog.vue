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
        <v-switch
          v-model="darkTheme"
          :label="$t('settingsDialog.darktheme')"
        />
        {{ $t('settingsDialog.videoLinkProviderTitle') }}:
        <v-radio-group class="mt-0" v-model="videoLinkProvider">
          <v-radio label="YouTube" value="https://youtube.com/watch?v="/>
          <v-radio label="invidio.us" value="https://invidio.us/watch?v="/>
          <v-radio :label="$t('settingsDialog.radioCustomLabel')" value="custom"/>
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
