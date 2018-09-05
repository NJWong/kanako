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
          <td>TODO: testCPM</td>
        </tr>
        <tr>
          <td>Score</td>
          <td>TODO: correct / TODO: (correct + incorrect)</td>
        </tr>
        <tr>
          <td>Average CPM*</td>
          <td>TODO: averageCPM</td>
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
      console.warn('Reset');

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
    averageCPM: function() {
      return this.$store.state.averageCPM;
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
