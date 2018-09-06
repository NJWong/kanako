<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <span class="navbar-item">
        <router-link to="/">Kanako Beta</router-link>
      </span>
      <div class="navbar-burger burger" :class="{ 'is-active': navIsOpen }" @click="toggleNav">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': navIsOpen }">
      <div class="navbar-start">
        <span class="navbar-item">
          <router-link to="/home"><span @click="closeNav">Home</span></router-link>
        </span>
        <span class="navbar-item" @click="closeNav">
          <router-link to="/kana-test"><span @click="closeNav">Kana Test</span></router-link>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TheNav",
  data: function() {
    return {
      navIsOpen: false
    };
  },
  methods: {
    toggleNav: function() {
      this.navIsOpen = !this.navIsOpen;
    },
    closeNav: function() {
      this.navIsOpen = false;
    }
  }
};
</script>

<style scoped lang="scss">
</style>
