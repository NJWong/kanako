<template>
  <KanaTestLevels v-if="view === 'levels'"/>
  <KanaTestInput v-else-if="view === 'input'"/>
  <KanaTestStats v-else-if="view === 'stats'"/>
</template>

<script>
import KanaTestLevels from "@/components/KanaTest/KanaTestLevels";
import KanaTestInput from "@/components/KanaTest/KanaTestInput";
import KanaTestStats from "@/components/KanaTest/KanaTestStats";

export default {
  name: "TheKanaTest",
  components: {
    KanaTestLevels,
    KanaTestInput,
    KanaTestStats
  },
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    view: function() {
      return this.$store.state.KanaTest.view;
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
