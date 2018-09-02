<template>
  <div class="game-panel center" v-if="showGame">
    <form class="pure-form" @submit.prevent>
      <div class="pure-g">
        <div class="pure-u-1">
          <p><span :class="{ error: hasError, partial: hasPartialMatch, done: hasFullMatch }">{{ targetValue }}</span></p>
        </div>
        <div class="pure-u-1">
          <input v-model="inputValue" @keyup="handleKeyUp" @keyup.space="submit" @keyup.enter="submit">
          <p>Time: <span>{{ countdown }}</span></p>
          <p>Correct: <span class="done">{{ correct }}</span></p>
          <p>Incorrect: <span class="error">{{ incorrect }}</span></p>
        </div>
      </div>
    </form>
  </div>
  <div class="game-stats center" v-else>
    <h2>Game over!</h2>
    <p>You got <span class="done">{{ correct }} correct</span> out of {{ correct + incorrect }} words!</p>
    <button class="pure-button pure-button-primary" @click="reset">Try again?</button>
  </div>
</template>

<script>
import { toHiragana } from "wanakana";

export default {
  name: "Input",
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
      countdown: 30,
      gameRunning: false
    };
  },
  mounted: function() {
    // Generate the first target value
    this.generateNextValue();
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
    },
    reset: function() {
      this.showGame = true;
      this.gameRunning = false;
      this.correct = 0;
      this.incorrect = 0;
      this.countdown = 30;
      this.inputValue = "";
      this.clearStatus();
      this.generateNextValue();
    },
    generateNextValue: function() {
      // Create kana by line
      const aLine = ["あ", "い", "う", "え", "お"];
      const kaLine = ["か", "き", "く", "け", "こ"];

      // Create kana list and total count
      const kanaList = [].concat(aLine, kaLine);
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

      // Convert input value to hiragana
      this.inputValue = toHiragana(this.inputValue).trim();

      // Clear previous status
      this.clearStatus();

      // Check input value is not empty
      if (this.inputValue.length > 0) {
        // Check for full match
        if (this.inputValue === this.targetValue) {
          this.hasFullMatch = true;
        }
        // Check for partial match
        else if (this.targetValue.indexOf(this.inputValue) === 0) {
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.center {
  text-align: center;
}
.error {
  color: red;
}
.partial {
  color: orange;
}
.done {
  color: green;
}
</style>
