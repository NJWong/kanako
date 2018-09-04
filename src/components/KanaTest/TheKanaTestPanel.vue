<template>
  <div class="kana-panel" v-if="showTest">
    <form class="pure-form" @submit.prevent>
      <div class="pure-g">
        <div class="pure-u-1 target-container">
          <div class="pure-u-1-3 text-container">
            <span :class="{ error: hasError, warning: hasPartialMatch, success: hasFullMatch }">{{ targetValue }}</span>
          </div>
        </div>
        <div class="pure-u-1 input-container">
          <KanaInput :handleKeyUp="handleKeyUp" :submit="submit"></KanaInput>
          <p class="countdown">Time remaining: <span>{{ countdown }} seconds</span></p>
        </div>
      </div>
    </form>
  </div>
  <div class="test-stats" v-else>
    <h2>Game over!</h2>
    <table class="pure-table pure-table-horizontal results-table">
      <thead>
        <tr>
          <th colspan="2">Results</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>CPM*</td>
          <td>{{ testCPM }}</td>
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
    <button class="pure-button pure-button-primary" @click="reset">Try again!</button>
    <h5>*CPM = Characters Per Minute</h5>
  </div>
</template>

<script>
import * as wanakana from "wanakana";
import { generateKanaList } from "@/data/kana";
import KanaInput from "@/components/KanaTest/KanaInput";

export default {
  name: "TheKanaTestPanel",
  components: {
    KanaInput
  },
  data: function() {
    return {
      showTest: true,
      inputValue: "",
      targetValue: "",
      hasError: false,
      hasPartialMatch: false,
      hasFullMatch: false,
      correct: 0,
      incorrect: 0,
      testCPM: 0,
      countdown: 30,
      testRunning: false
    };
  },
  mounted: function() {
    // Generate the first target value
    this.generateNextValue();
  },
  computed: {
    difficulty: function() {
      return this.$store.state.difficulty;
    },
    averageCPM: function() {
      return this.$store.state.averageCPM;
    }
  },
  methods: {
    start: function() {
      // Start the test
      this.testRunning = true;

      // Set the countdown
      var timer = setInterval(
        function() {
          this.countdown -= 1;

          // Stop when we get to 0
          if (this.countdown === 0) {
            clearInterval(timer);
            this.stop();
          }
        }.bind(this),
        1000
      );
    },
    stop: function() {
      this.showTest = false;
      this.testRunning = false;
      this.calculateScore();
    },
    reset: function() {
      this.showTest = true;
      this.testRunning = false;
      this.correct = 0;
      this.incorrect = 0;
      this.testCPM = 0;
      this.countdown = 30;
      this.clearStatus();
      this.generateNextValue();
    },
    generateNextValue: function() {
      // Create kana list and total count
      const kanaList = generateKanaList(this.difficulty);
      const kanaCount = kanaList.length;

      // Init next value
      let nextValue = "";

      // Randomly generate next value
      for (let i = 0; i < 3; i++) {
        const index = Math.floor(Math.random() * Math.floor(kanaCount));
        nextValue += kanaList[index];
      }

      // Set target value to randomly generated new value
      this.targetValue = nextValue;
    },
    handleKeyUp: function(inputValue) {
      // Start the test if not already running
      if (!this.testRunning) {
        this.start();
      }

      // Clear previous status
      this.clearStatus();

      const inputValueRomaji = wanakana.toRomaji(inputValue);
      const targetValueRomaji = wanakana.toRomaji(this.targetValue);

      // Check input value is not empty
      if (inputValue.length > 0) {
        // Check for full match
        if (inputValue === this.targetValue) {
          this.hasFullMatch = true;
        }
        // Check for partial match using Romaji conversion
        else if (targetValueRomaji.indexOf(inputValueRomaji) === 0) {
          this.hasPartialMatch = true;
        }
        // If not full or partial match, then there is an error
        else {
          this.hasError = true;
        }
      }
    },
    submit: function(inputRef) {
      // Update score
      inputRef.value.trim() === this.targetValue
        ? (this.correct += 1)
        : (this.incorrect += 1);

      // Reset input field and statuses
      inputRef.value = "";
      this.clearStatus();

      // Get next target value
      this.generateNextValue();
    },
    clearStatus() {
      this.hasError = false;
      this.hasPartialMatch = false;
      this.hasFullMatch = false;
    },
    calculateScore: function() {
      const correctCharacters = this.correct * 3;
      const timeFactor = 60 / 60;
      this.testCPM = correctCharacters * timeFactor;

      this.$store.commit("updateAverageCPM", this.testCPM);
      this.$store.commit("increaseGameCount");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$success-green: rgb(76, 217, 100);
$warning-orange: rgb(255, 149, 0);
$error-red: rgb(255, 59, 48);
$teal-blue: rgb(90, 200, 250);
$white: rgb(255, 255, 255);

.kana-panel,
.test-stats {
  text-align: center;
}

.target-container {
  .text-container {
    font-size: 30px;
    margin: 20px 0;
    border: 1px dashed #e1e1e1;
  }

  span {
    display: block;
    padding: 10px 20px;
    transition: color 0.15s;
    background-color: $white;
  }
}

.success {
  color: $success-green;
}

.warning {
  color: $warning-orange;
}

.error {
  color: $error-red;
}

.input-container {
  input {
    font-size: 20px;
    text-align: center;

    &:focus {
      border-color: $teal-blue;
    }
  }
}

.results-table {
  margin: 25px auto;

  thead {
    text-align: center;
  }
}

.countdown {
  font-size: 16px;
  font-style: italic;
}
</style>
