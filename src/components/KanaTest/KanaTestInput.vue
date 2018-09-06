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
          <input id="kana-input" ref="kana-input" @keyup="handleKeyUp" @keyup.space="submit" @keyup.enter="submit">
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
      hasError: false,
      hasPartialMatch: false,
      hasFullMatch: false,
      countdown: 10
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
    start: function() {
      // Start the test
      this.$store.dispatch("startTest");

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
      this.$store.dispatch("stopTest");
      this.calculateScore();
    },
    handleKeyUp: function() {
      // Start the test if not already running
      if (!this.running) {
        this.start();
      }

      this.inputValue = this.$refs["kana-input"].value;

      // Clear previous status
      this.clearStatus();

      // Convert the romaji values for comparison
      const inputValueRomaji = wanakana.toRomaji(this.inputValue);
      const targetValueRomaji = wanakana.toRomaji(this.targetValue);

      // Check input value is not empty
      if (this.inputValue.length > 0) {
        // Check for full match
        if (this.inputValue === this.targetValue) {
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
    submit: function() {
      // Update score
      this.inputRef.value.trim() === this.targetValue
        ? this.$store.dispatch("incrementCorrect")
        : this.$store.dispatch("incrementIncorrect");

      // Reset input field and status
      this.$refs["kana-input"].value = "";
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
      const currentCPM = correctCharacters * timeFactor;

      this.$store.dispatch("updateCurrentCPM", { currentCPM: currentCPM });
      this.$store.dispatch("updateAverageCPM", { newCPM: this.currentCPM });
      this.$store.dispatch("increaseGameCount");
    }
  },
  computed: {
    difficulty: function() {
      return this.$store.state.KanaTest.difficulty;
    },
    running: function() {
      return this.$store.state.KanaTest.running;
    },
    correct: function() {
      return this.$store.state.KanaTest.correct;
    },
    incorrect: function() {
      return this.$store.state.KanaTest.incorrect;
    },
    currentCPM: function() {
      return this.$store.state.KanaTest.currentCPM;
    },
    inputRef: function() {
      return this.$refs["kana-input"];
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
