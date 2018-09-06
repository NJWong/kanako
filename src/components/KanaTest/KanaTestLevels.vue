<template>
  <div class="buttons">
    <button class="button" @click="startTest(1)">Level 1 - あ-line</button>
    <button class="button" @click="startTest(2)">Level 2 - か-line</button>
    <button class="button" @click="startTest(3)">Level 3 - が-line</button>
    <button class="button" @click="startTest(4)">Level 4 - さ-line</button>
    <button class="button" @click="startTest(5)">Level 5 - ざ-line</button>
    <button class="button" @click="startTest(6)">Challenge 1 - あ-line, か-line, が-line, さ-line, ざ-line</button>
  </div>
</template>
<script>
export default {
  name: "KanaTestLevels",
  data: function() {
    return {};
  },
  methods: {
    startTest: function(difficulty) {
      this.$store.dispatch("setDifficulty", { difficulty: difficulty });
      this.$store.dispatch("resetTest");
      this.$store.dispatch("setView", { view: "input" });
    }
  },
  computed: {
    currentCPM: function() {
      return this.$store.state.KanaTest.currentCPM;
    },
    averageCPM: function() {
      return this.$store.state.KanaTest.averageCPM;
    },
    correct: function() {
      return this.$store.state.KanaTest.correct;
    },
    incorrect: function() {
      return this.$store.state.KanaTest.incorrect;
    }
  }
};
</script>
<style scoped lang="scss">
</style>
