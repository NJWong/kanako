<template>
  <div class="kana-button-container">
    <button class="kana-button" @click="onClick">{{ label }}</button>
  </div>
</template>

<script>
export default {
  name: "KanaButton",
  props: {
    label: String,
    onClick: Function
  }
};
</script>

<style scoped lang="scss">
.kana-button-container {
  margin: 12px 0;
}

.kana-button {
  min-width: 120px;
  background-color: transparent;
  color: #777;
  border-color: #777;
  text-transform: uppercase;
  padding: 8px 16px;
  box-shadow: 1px 1px 4px #999;
  transition: box-shadow 0.1s ease-in-out;

  &:hover {
    box-shadow: 2px 2px 8px #999;
  }
}
</style>
