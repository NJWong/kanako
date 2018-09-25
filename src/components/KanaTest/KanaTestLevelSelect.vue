<template>
  <div>
    <div class="level-cards">
      <KanaCard title="あ" bgColor="teal" :onClick="startTest.bind(this, 1)"/>
      <KanaCard title="か" bgColor="pink" :onClick="startTest.bind(this, 2)"/>
      <KanaCard title="さ" bgColor="purple" :onClick="startTest.bind(this, 3)"/>
      <KanaCard title="た" bgColor="blue" :onClick="startTest.bind(this, 4)"/>
      <KanaCard title="Challenge #1" bgColor="yellow" variant="full-width" :onClick="startTest.bind(this, 5)"/>
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
      this.$store.dispatch("setIsAnimating", true);

      setTimeout(() => {
        this.$store.dispatch("setView", { view: "input" });
      }, 500);
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
.level-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
