<template>
  <div>
    <KanaTestLevelSelect v-if="isLevelSelect"/>
    <KanaTestInput v-else-if="isInput"/>
    <KanaTestStats v-else-if="isStats"/>
    <div v-if="isAnimating" class="animation-overlay-container">
      <div class="animation-overlay">
        <h2>Let's go!</h2>
      </div>
    </div>
  </div>
</template>

<script>
import KanaTestLevelSelect from "@/components/KanaTest/KanaTestLevelSelect";
import KanaTestInput from "@/components/KanaTest/KanaTestInput";
import KanaTestStats from "@/components/KanaTest/KanaTestStats";

export default {
  name: "TheKanaTest",
  components: {
    KanaTestLevelSelect,
    KanaTestInput,
    KanaTestStats
  },
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    isLevelSelect: function() {
      return this.$store.state.KanaTest.view === "levelSelect";
    },
    isInput: function() {
      return this.$store.state.KanaTest.view === "input";
    },
    isStats: function() {
      return this.$store.state.KanaTest.view === "stats";
    },
    isAnimating: function() {
      return this.$store.state.KanaTest.isAnimating;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.animation-overlay-container {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}

.animation-overlay {
  background-color: #ef5350;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  animation: pop 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s forwards;
  transform-origin: center center;

  h2 {
    margin: 0;
    font-size: 80px;
  }
}

@keyframes pop {
  0% {
    transform: scale(0);
    // border-radius: 100%;
    color: transparent;
  }

  50% {
    transform: scale(1);
    // border-radius: 0;
    color: black;
  }

  70% {
    transform: scale(1.1);
    // border-radius: 0;
  }

  100% {
    transform: scale(0);
    // border-radius: 100%;
    color: transparent;
  }
}

.kana-panel,
.test-stats {
  text-align: center;
}
</style>
