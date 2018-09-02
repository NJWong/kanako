<template>
  <div class="game-panel" v-if="showGame">
    <form class="pure-form" @submit.prevent>
      <div class="pure-g">
        <div class="pure-u-1 target-container">
          <div class="text-container">
            <span :class="{ error: hasError, warning: hasPartialMatch, success: hasFullMatch }">{{ targetValue }}</span>
          </div>
        </div>
        <div class="pure-u-1 input-container">
          <input v-model="inputValue" @keyup="handleKeyUp" @keyup.space="submit" @keyup.enter="submit">
          <p class="countdown">Time remaining: <span>{{ countdown }} seconds</span></p>
        </div>
      </div>
    </form>
  </div>
  <div class="game-stats" v-else>
    <h2>Game over!</h2>
    <p>Correct: <span class="success">{{ correct }}</span></p>
    <p>Incorrect: <span class="error">{{ incorrect }}</span></p>
    <p>You got <span class="success">{{ correct }} correct</span> out of {{ correct + incorrect }} words!</p>
    <p>That's an average of <span class="success">{{ gameCPM }} kana</span> per minute</p>
    <p>Your running total average is <span class="success">{{ averageCPM }}</span></p>
    <button class="pure-button pure-button-primary" @click="reset">Try again!</button>
  </div>
</template>

<script>
import { toHiragana, toRomaji } from "wanakana";
import { generateKanaList } from "@/data/kana";

export default {
  name: "KanaPanel",
  data: function() {
    return {
      showGame: true,
      inputValue: "",
      targetValue: "",
      hasError: false,
      hasPartialMatch: false,
      hasFullMatch: false,
      correct: 0,
      incorrect: 0,
      gameCPM: 0,
      countdown: 60,
      gameRunning: false
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
      // Start the game
      this.gameRunning = true;

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
      this.showGame = false;
      this.gameRunning = false;
      this.calculateScore();
    },
    reset: function() {
      this.showGame = true;
      this.gameRunning = false;
      this.correct = 0;
      this.incorrect = 0;
      this.gameCPM = 0;
      this.countdown = 60;
      this.inputValue = "";
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
        const index = Math.floor(Math.random() * Math.floor(kanaCount - 1));
        nextValue += kanaList[index];
      }

      // Set target value to randomly generated new value
      this.targetValue = nextValue;
    },
    handleKeyUp: function() {
      // Start the game if not already running
      if (!this.gameRunning) {
        this.start();
      }

      // Convert input value to Romaji then to Hiragana
      // Case: When you want to write "ぬ" but inputValue is converted to "ん" before you can type the "u".
      this.inputValue = toHiragana(toRomaji(this.inputValue)).trim();

      // Clear previous status
      this.clearStatus();

      const inputValueRomaji = toRomaji(this.inputValue);
      const targetValueRomaji = toRomaji(this.targetValue);

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
    clearStatus() {
      this.hasError = false;
      this.hasPartialMatch = false;
      this.hasFullMatch = false;
    },
    submit: function() {
      // Update score
      this.inputValue === this.targetValue
        ? (this.correct += 1)
        : (this.incorrect += 1);

      // Reset input field and statuses
      this.inputValue = "";
      this.clearStatus();

      // Get next target value
      this.generateNextValue();
    },
    calculateScore: function() {
      const correctCharacters = this.correct * 3;
      const timeFactor = 60 / 60;
      this.gameCPM = correctCharacters * timeFactor;

      this.$store.commit("updateAverageCPM", this.gameCPM);
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
$white: rgb(255, 255, 255);

.game-panel,
.game-stats {
  text-align: center;
}

.target-container {
  .text-container {
    font-size: 30px;
    padding: 20px 0;
  }

  span {
    padding: 0 10px;
    transition: color 0.15s;

    &.success {
      color: $success-green;
    }

    &.warning {
      color: $warning-orange;
    }

    &.error {
      color: $error-red;
    }
  }
}

.input-container {
  input {
    font-size: 20px;
    text-align: center;
  }
}

.countdown {
  font-size: 16px;
  font-style: italic;
}
</style>
