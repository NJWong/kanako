<template>
  <KanaTestInput v-if="showTest"/>
  <KanaTestStats v-else/>
</template>

<script>
import KanaTestInput from "@/components/KanaTest/KanaTestInput";
import KanaTestStats from "@/components/KanaTest/KanaTestStats";

export default {
  name: "TheKanaTest",
  components: {
    KanaTestInput,
    KanaTestStats
  },
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    showTest: function() {
      return this.$store.state.KanaTest.showTest;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.kana-panel,
.test-stats {
  text-align: center;
}
</style>
