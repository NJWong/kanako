<template>
  <div class="kana-panel">
    <form @submit.prevent>
      <div>
        <div class="target-container">
          <div class="target-text">
            <span :class="{ error: hasError, warning: hasPartialMatch, success: hasFullMatch }">{{ targetValue }}</span>
          </div>
        </div>
        <div class="kana-input-container">
          <div>
            <div>
              <input
                id="kana-input"
                ref="kana-input"
                class="input"
                :class="{ error: hasError, warning: hasPartialMatch, success: hasFullMatch }"
                type="text"
                @keyup="handleKeyUp"
                @keyup.space="submit"
                @keyup.enter="submit">
            </div>
          </div>
          <p class="countdown">Time remaining: <span>{{ countdown }} seconds</span></p>
        </div>
      </div>
    </form>
    <KanaButton label="Instructions" :onClick="toggleInstructions"/>
    <div v-if="showInstructions">
      Instructions go here!
    </div>
  </div>
</template>

<script>
import * as wanakana from "wanakana";
import { generateKanaList } from "@/data/kana";
import KanaButton from "@/components/Global/KanaButton";

export default {
  name: "KanaTestInput",
  components: {
    KanaButton
  },
  data: function() {
    return {
      inputValue: "",
      targetValue: "",
      hasError: false,
      hasPartialMatch: false,
      hasFullMatch: false,
      countdown: 30,
      showInstructions: false
    };
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
      const timeFactor = 30 / 60;
      const currentCPM = correctCharacters * timeFactor;

      this.$store.dispatch("updateCurrentCPM", { currentCPM: currentCPM });
      this.$store.dispatch("updateAverageCPM", { newCPM: this.currentCPM });
      this.$store.dispatch("increaseGameCount");
    },
    toggleInstructions: function() {
      this.showInstructions = !this.showInstructions;
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

.kana-panel {
  font-family: "Noto Sans JP", sans-serif;
}

.target-container {
  padding-bottom: 25px;

  .target-text {
    font-size: 36px;
    box-shadow: 2px 2px 8px #777;
  }

  span {
    display: block;
    padding: 15px;
    transition: color 0.15s;
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

.kana-input-container {
  input {
    font-size: 28px;
    text-align: center;
  }
}

.countdown {
  font-size: 16px;
  font-style: italic;
}
</style>
