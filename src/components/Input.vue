<template>
  <div>
    <div class="pure-g center">
      <div class="pure-u-1">
        <p>Target is: <span :class="{ error: !empty && !fullMatch && !partialMatch, partial: !empty && !fullMatch && partialMatch, done: !empty && fullMatch }">{{ targetValue }}</span></p>
      </div>
      <div class="pure-u-1 center">
        <input v-model="inputValue" @keyup="handleKeyUp" @keyup.space="submit">
        <p>Value is: {{ inputValue }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Input",
  data: function() {
    return {
      inputValue: "",
      targetValue: "abc",
      initial: true
    };
  },
  methods: {
    handleKeyUp: function() {
      if (this.inputValue.length === 0) {
        this.initial = true;
      } else {
        this.inital = false;
      }
    },
    submit: function() {
      this.inputValue = "";
    }
  },
  computed: {
    empty: function() {
      return this.inputValue.length === 0;
    },
    fullMatch: function() {
      return this.inputValue === this.targetValue;
    },
    partialMatch: function() {
      return this.targetValue.indexOf(this.inputValue) === 0;
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
