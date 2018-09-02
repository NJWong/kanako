<template>
  <div id="app">
    <div id="nav">
    </div>
    <div class="app-content">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: #fafafa;
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
