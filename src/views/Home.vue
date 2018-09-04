<template>
  <div class="home">
    <TheHomePanel/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheHomePanel from "@/components/Home/TheHomePanel.vue";

export default {
  name: "home",
  components: {
    TheHomePanel
  }
};
</script>
