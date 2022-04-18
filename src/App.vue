<template>
  <v-app>
    <v-main v-if="$route.meta.plainLayout">
      <router-view/>
    </v-main>
    <div v-if="!$route.meta.plainLayout"> 
       <v-app-bar
        app
        color="white"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
      >
      <div class="d-flex align-center">
        <v-img
          alt="Wac Logo"
          class="shrink mr-2"
          contain
          src="./assets/Logo2.png"
          transition="scale-transition"
          width="90"
        />
      </div>

      <v-spacer></v-spacer>

      <router-link :to="{ name: 'Project' }">
        <v-btn text>
          <span class="mr-2">Project</span>
        </v-btn>
      </router-link>
      <router-link :to="{ name: 'ArticleList' }">
      <v-btn text>
        <span class="mr-2">Articles</span>
      </v-btn>
      </router-link>
      <router-link :to="{ name: 'Article' }">
      <v-btn text>
        <span class="mr-2">ADD Article</span>
      </v-btn>
      </router-link>
      <v-btn icon v-on:click.prevent="logOut">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
      <router-view/>
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),

   methods: {
    logOut() {
      this.$store.dispatch("auth_logout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped>
.router-link-exact-active {
  background: #f4f4f4;
}
</style>