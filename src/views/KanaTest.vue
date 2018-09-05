<template>
  <div class="kana-test">
    <TheKanaTest/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheKanaTest from "@/components/KanaTest/_TheKanaTest.vue";

export default {
  name: "KanaTest",
  components: {
    TheKanaTest
  }
};
</script>
