<template>
  <div class="test-stats">
    <h2>Game over!</h2>
    <table class="results-table">
      <thead>
        <tr>
          <th colspan="2">Results</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>CPM*</td>
          <td>{{ currentCPM }}</td>
        </tr>
        <tr>
          <td>Score</td>
          <td>{{ correct }} / {{ correct + incorrect }}</td>
        </tr>
        <tr>
          <td>Average CPM*</td>
          <td>{{ averageCPM }}</td>
        </tr>
      </tbody>
    </table>
    <button>Try again!</button>
    <h5>*CPM = Characters Per Minute</h5>
  </div>
</template>

<script>
export default {
  name: "KanaTestStats",
  data: function() {
    return {};
  },
  method: {
    reset: function() {
      console.warn("Reset");

      // this.showTest = true;
      // this.testRunning = false;
      // this.correct = 0;
      // this.incorrect = 0;
      // this.testCPM = 0;
      // this.countdown = 30;
      // this.clearStatus();
      // this.generateNextValue();
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
  margin: 25px auto;

  thead {
    text-align: center;
  }
}
</style>
