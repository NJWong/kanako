<template>
  <div>
    <KanaButton label="Level 1 - あ-line" :onClick="startTest.bind(this, 1)" />
    <KanaButton label="Level 2 - か-line" :onClick="startTest.bind(this, 2)" />
    <KanaButton label="Level 3 - が-line" :onClick="startTest.bind(this, 3)" />
    <KanaButton label="Level 4 - さ-line" :onClick="startTest.bind(this, 4)" />
    <KanaButton label="Level 5 - ざ-line" :onClick="startTest.bind(this, 5)" />
    <KanaButton label="Challenge 1 - あ-line, か-line, が-line, さ-line, ざ-line" :onClick="startTest.bind(this, 6)" />
  </div>
</template>
<script>
import KanaButton from "@/components/Global/KanaButton";

export default {
  name: "KanaTestLevels",
  components: {
    KanaButton
  },
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
