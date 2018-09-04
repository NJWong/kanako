<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <span class="navbar-item">
        <router-link to="/">Kanako Logo</router-link>
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
          <router-link to="/home">Home</router-link>
        </span>
        <span class="navbar-item">
          <router-link to="/kana-test">Kana Test</router-link>
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
    }
  }
};
</script>
