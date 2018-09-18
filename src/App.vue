<template>
  <div id="app" class="kanako-app">
    <TheNav/>
    <div class="app-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TheNav from "@/components/Global/TheNav.vue";

export default {
  name: "app",
  components: {
    TheNav
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+JP:300,400,700&subset=japanese");

.kanako-app {
  html,
  button,
  input,
  select,
  textarea,
  .pure-g [class*="pure-u"] {
    font-family: "Noto Sans JP", sans-serif;
  }
}

.app-content {
  padding: 0 10px;

  // sm
  @media screen and (min-width: 35.5em) {
    padding: 0 20px;
  }

  // md
  @media screen and (min-width: 48em) {
    padding: 0 20px;
  }

  // lg
  @media screen and (min-width: 64em) {
    padding: 0 20px;
    margin: 0 20px;
  }

  // xl
  @media screen and (min-width: 80em) {
    padding: 0 20px;
    margin: 0 20px;
  }
}
</style>
