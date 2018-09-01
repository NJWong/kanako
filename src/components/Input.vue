<template>
  <div>
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
  </div>
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
    this.generateNextValue();
  },
  methods: {
    generateNextValue: function() {
      const a_line = ["あ", "い", "う", "え", "お"];

      let nextValue = "";

      for (let i = 0; i < 3; i++) {
        const index = Math.floor(Math.random() * Math.floor(4));
        nextValue += a_line[index];
      }

      this.targetValue = nextValue;
    },
    handleKeyUp: function() {
      this.inputValue = toHiragana(this.inputValue).trim();

      if (this.inputValue.length === 0) {
        this.clearStatus();
      } else if (this.inputValue === this.targetValue) {
        this.setFullMatch();
      } else if (this.targetValue.indexOf(this.inputValue) === 0) {
        this.setPartialMatch();
      } else {
        this.setError();
      }
    },
    clearStatus() {
      this.hasError = false;
      this.hasPartialMatch = false;
      this.hasFullMatch = false;
    },
    setFullMatch() {
      this.hasError = false;
      this.hasPartialMatch = false;
      this.hasFullMatch = true;
    },
    setPartialMatch() {
      this.hasError = false;
      this.hasPartialMatch = true;
      this.hasFullMatch = false;
    },
    setError() {
      this.hasError = true;
      this.hasPartialMatch = false;
      this.hasFullMatch = false;
    },
    submit: function() {
      if (this.inputValue === this.targetValue) {
        this.correct += 1;
      } else {
        this.incorrect += 1;
      }
      this.inputValue = "";
      this.clearStatus();
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
