<template>
  <input id="kana-input" ref="kana-input" @keyup="handleKeyUp(inputValue())" @keyup.space="submit(inputRef())" @keyup.enter="submit(inputRef())">
</template>

<script>
import * as wanakana from "wanakana";

export default {
  name: "KanaInput",
  props: {
    handleKeyUp: Function,
    submit: Function
  },
  mounted: function() {
    // Bind the kana input to `wanakana`
    wanakana.bind(document.getElementById("kana-input"));
  },
  methods: {
    inputRef: function() {
      return this.$refs["kana-input"];
    },
    inputValue: function() {
      return this.$refs["kana-input"].value;
    }
  }
};
</script>

<style scoped lang="scss">
</style>
