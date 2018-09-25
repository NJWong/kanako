<template>
  <div class="kana-card-container" :class="variant">
    <div class="kana-card" @click="onClick">
      <div class="kana-card-media" :class="bgColor">
        <h4>{{ title }}</h4>
        <h5 v-if="subtitle">{{ subtitle }}</h5>
      </div>
      <div class="kana-card-stars">
        <font-awesome-icon icon="star" size="3x" color="#ffeb3b"/>
        <font-awesome-icon icon="star" size="3x" color="#ffeb3b"/>
        <font-awesome-icon icon="star" size="3x" color="#eeeeee"/>
      </div>
      <div class="kana-card-score">
        <h5>High Score: <span>34 CPM</span></h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KanaCard",
  props: {
    title: String,
    subtitle: String,
    bgColor: String,
    variant: String,
    onClick: Function
  }
};
</script>

<style scoped lang="scss">
@mixin bgColors {
  &.red {
    background-color: #b71540;
  }
  &.pink {
    background-color: #c44569;
  }
  &.purple {
    background-color: #786fa6;
  }
  &.violet {
    background-color: #673ab7;
  }
  &.green {
    background-color: #78e08f;
  }
  &.blue {
    background-color: #778beb;
  }
  &.teal {
    background-color: #63cdda;
  }
  &.yellow {
    background-color: #fff200;
  }
}

.kana-card-container {
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  flex: 0 1 100%;

  // md
  @media screen and (min-width: 48em) {
    flex: 0 1 50%;

    &.full-width {
      flex: 0 1 100%;
    }
  }
}

.full-width .kana-card-media {
  word-break: break-all;

  h4 {
    font-size: 2.8em;
  }
}

.kana-card {
  overflow: auto;
  min-height: 260px;
  min-width: 250px;
  background-color: #ffffff;
  box-shadow: 0 4px 15px #888;
  border-radius: 2px;
  transition: box-shadow 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 10px 40px #999;
    transform: translate3d(0px, -1px, 0px);
  }
}

.kana-card-media {
  @include bgColors;

  min-height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h4 {
    margin: 0;
    font-weight: 600;
    font-size: 90px;
    text-shadow: 4px 4px 6px #444;
    color: #fff;
  }
}

.kana-card-stars {
  .fa-star {
    padding: 12px;
  }
}

.kana-card-score {
  h5 {
    font-size: 20px;
    font-weight: 300;
    margin: 10px 0;

    span {
      font-weight: 600;
    }
  }
}
</style>
