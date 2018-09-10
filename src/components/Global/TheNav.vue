<template>
  <div class="pure-menu pure-menu-horizontal">
    <router-link to="/" class="pure-menu-heading pure-menu-link">Kanako Beta</router-link>
    <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <router-link to="/home" class="pure-menu-link"><span @click="closeNav">Home</span></router-link>
        </li>
        <li class="pure-menu-item">
          <router-link to="/kana-test" class="pure-menu-link"><span @click="closeNav">Kana Test</span></router-link>
        </li>
    </ul>
  </div>
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
