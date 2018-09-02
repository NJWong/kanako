<template>
  <form class="pure-form" @submit.prevent>
    <div class="pure-g center">
      <div class="pure-u-1">
        <p><span :class="{ error: hasError, partial: hasPartialMatch, done: hasFullMatch }">{{ targetValue }}</span></p>
      </div>
      <div class="pure-u-1 center">
        <input id="kanako-input" v-model="inputValue" @keyup="handleKeyUp" @keyup.space="submit" @keyup.enter="submit">
        <p>Correct: <span class="done">{{ correct }}</span></p>
        <p>Incorrect: <span class="error">{{ incorrect }}</span></p>
      </div>
    </div>
  </form>
</template>

<script>
import { toHiragana } from "wanakana";

export default {
  name: "Input",
  data: function() {
    return {
      inputValue: "",
      targetValue: "",
      hasError: false,
      hasPartialMatch: false,
      hasFullMatch: false,
      correct: 0,
      incorrect: 0
    };
  },
  mounted: function() {
    // Generate the first target value
    this.generateNextValue();
  },
  methods: {
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
