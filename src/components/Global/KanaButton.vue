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
  background-color: transparent;
  padding: 8px 16px;
  border: none;
  text-transform: uppercase;
  transition: background-color 0.3s ease-in-out;
  color: #e91e63;

  &:hover {
    background-color: lighten(#e91e63, 40%);
  }
}
</style>
