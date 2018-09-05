<template>
  <div class="kana-panel">
    <form @submit.prevent>
      <div>
        <div class="target-container">
          <div class="text-container">
            <span :class="{ error: hasError, warning: hasPartialMatch, success: hasFullMatch }">{{ targetValue }}</span>
          </div>
        </div>
        <div class="input-container">
          <input id="kana-input" ref="kana-input" @keyup="handleKeyUp(inputValue)" @keyup.space="submit(inputRef())" @keyup.enter="submit(inputRef())">
          <p class="countdown">Time remaining: <span>{{ countdown }} seconds</span></p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import * as wanakana from "wanakana";
import { generateKanaList } from "@/data/kana";

export default {
  name: "KanaTestInput",
  data: function() {
    return {
      inputValue: "",
      targetValue: "",
      testRunning: false,
      hasError: false,
      hasPartialMatch: false,
      hasFullMatch: false,
      correct: 0,
      incorrect: 0,
      countdown: 10,
      testCPM: 0
    };
  },
  props: {
    stopTest: Function
  },
  mounted: function() {
    // Bind the kana input to `wanakana`
    wanakana.bind(document.getElementById("kana-input"));

    // Generate the first target value
    this.generateNextValue();
  },
  methods: {
    inputRef: function() {
      return this.$refs["kana-input"];
    },
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
      this.stopTest();
      this.testRunning = false;
      this.calculateScore();
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
    calculateScore: function() {
      const correctCharacters = this.correct * 3;
      const timeFactor = 60 / 60;
      this.testCPM = correctCharacters * timeFactor;

      this.$store.commit("updateAverageCPM", this.testCPM);
      this.$store.commit("increaseGameCount");
    }
  },
  computed: {
    difficulty: function() {
      return this.$store.state.difficulty;
    }
  }
};
</script>

<style scoped lang="scss">
$success-green: rgb(76, 217, 100);
$warning-orange: rgb(255, 149, 0);
$error-red: rgb(255, 59, 48);
$teal-blue: rgb(90, 200, 250);
$white: rgb(255, 255, 255);

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

.countdown {
  font-size: 16px;
  font-style: italic;
}
</style>
