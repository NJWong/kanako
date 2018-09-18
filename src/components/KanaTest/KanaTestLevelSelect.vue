<template>
  <div>
    <div class="pure-g">
      <KanaCard title="Level 1" media="あ" description="あ、い、う、え、お" gradient="pink"/>
      <KanaCard title="Level 2" media="か" description="か、き、く、け、こ" gradient="blue"/>
      <KanaCard title="Level 3" media="さ" description="さ、し、す、せ、そ" gradient="green"/>
    </div>
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
import KanaCard from "@/components/Global/KanaCard";

export default {
  name: "KanaTestLevelSelect",
  components: {
    KanaCard,
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
