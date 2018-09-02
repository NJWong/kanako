<template>
  <div class="home">
    <KanaPanel/>
  </div>
</template>

<script>
// @ is an alias to /src
import KanaPanel from "@/components/KanaPanel.vue";

export default {
  name: "home",
  components: {
    KanaPanel
  }
};
</script>
