<template>
  <v-dialog
      v-model="dialog"
      width="500"
      scrollable
    >

    <template v-slot:activator="{ on }">
      <v-list-item v-on="on">
        <v-list-item-icon>
          <v-icon>mdi-information</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('About') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card>
      <v-card-title
        class="headline"
        primary-title
      >
        {{ $t('About videoline') }}
      </v-card-title>

      <v-card-text>
        {{ $t('videoline description text') }}
      </v-card-text>

      <v-divider/>

      <v-card-text style="height: 300px;">
        <h2 class="headline text--primary mt-4 mb-2">{{ $t('Releases') }}</h2>
        <div v-if="loading">
          <v-skeleton-loader
            v-for="n in 3"
            :key="n"
            type="article"
          />
        </div>
        <div class="mb-3" v-for="release in releases" :key="release.id" v-else>
          <h3 class="headline">{{ release.name }}</h3>
          <vue-markdown>{{ release.body }}</vue-markdown>
        </div>
      </v-card-text>

      <v-divider/>

      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          text
          href="https://github.com/pixeldesu/videoline"
        >
          {{ $t('View on GitHub') }}
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="dialog = !dialog"
        >
          {{ $t('Close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
  name: 'AboutDialog',

  components: {
    VueMarkdown,
  },

  data: () => ({
    dialog: false,
    loading: true,
    releases: [],
  }),

  created() {
    fetch('https://api.github.com/repos/pixeldesu/videoline/releases')
      .then((response) => response.json())
      .then((json) => {
        this.releases = json;
        this.loading = false;
      });
  },
};
</script>
