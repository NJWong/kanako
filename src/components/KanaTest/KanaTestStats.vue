<template>
  <div class="test-stats">
    <h2>Game over!</h2>
    <table class="table is-striped is-bordered results-table">
      <thead>
        <tr>
          <th colspan="2">Results</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>CPM*:</td>
          <td>{{ currentCPM }}</td>
        </tr>
        <tr>
          <td>Correct:</td>
          <td>{{ correct }} / {{ correct + incorrect }}</td>
        </tr>
        <tr>
          <td>Average CPM*:</td>
          <td>{{ averageCPM }}</td>
        </tr>
      </tbody>
    </table>
    <button class="button is-primary" @click="reset">Try again!</button>
    <button class="button is-secondary" @click="changeLevel">Change level</button>
    <h5 class="helper-text">*CPM = Characters Per Minute</h5>
  </div>
</template>

<script>
export default {
  name: "KanaTestStats",
  data: function() {
    return {};
  },
  methods: {
    reset: function() {
      this.$store.dispatch("resetTest");
      this.$store.dispatch("setView", { view: "input" });
    },
    changeLevel: function() {
      this.$store.dispatch("setView", { view: "levels" });
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
.results-table {
  margin: 30px auto;
}
.helper-text {
  padding: 20px 0;
}
</style>
