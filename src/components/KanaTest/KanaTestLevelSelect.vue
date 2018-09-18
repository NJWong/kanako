<template>
  <div>
    <div class="pure-g">
      <KanaCard title="Level 1" media="あ" description="あ、い、う、え、お" gradient="pink" :onClick="startTest.bind(this, 1)"/>
      <KanaCard title="Level 2" media="か" description="か、き、く、け、こ" gradient="blue" :onClick="startTest.bind(this, 2)"/>
      <KanaCard title="Level 3" media="さ" description="さ、し、す、せ、そ" gradient="green" :onClick="startTest.bind(this, 4)"/>
    </div>
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
