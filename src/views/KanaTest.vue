<template>
  <div class="kana-test">
    <TheKanaTestPanel/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheKanaTestPanel from "@/components/KanaTest/TheKanaTestPanel.vue";

export default {
  name: "kana-test",
  components: {
    TheKanaTestPanel
  }
};
</script>
