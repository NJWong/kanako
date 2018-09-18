<template>
  <div class="kana-card-container pure-u-1-3">
    <div class="kana-card">
      <div class="kana-card-media" :class="gradient">
        <h4>{{ media }}</h4>
      </div>
      <div class="kana-card-title">
        <h3>{{ title }}</h3>
      </div>
      <div class="kana-card-description">
        <p>{{ description }}</p>
      </div>
      <div class="kana-card-actions">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KanaCard",
  props: {
    title: String,
    media: String,
    gradient: String,
    description: String,
    actions: Array
  }
};
</script>

<style scoped lang="scss">
.kana-card-container {
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

.kana-card {
  overflow: auto;
  min-height: 250px;
  box-shadow: 0 4px 15px #888;
  border-radius: 2px;
  transition: box-shadow 0.1s ease-in-out;

  &:hover {
    box-shadow: 0 10px 40px #999;
    transform: translate3d(0px, -1px, 0px);
  }
}

.kana-card-title {
  display: inline-block;

  h3 {
    margin: 12px 0 5px 0;
    color: #e91e63;
  }

  h4 {
    margin: 0;
    font-weight: 300;
  }
}

.kana-card-media {
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h4 {
    margin: 0;
    font-weight: 300;
    font-size: 70px;
    text-shadow: 3px 3px 4px #777;
    color: #fff;
  }

  &.pink {
    background: rgba(255, 154, 158, 1);
    background: -moz-linear-gradient(
      -45deg,
      rgba(255, 154, 158, 1) 0%,
      rgba(254, 207, 239, 1) 100%
    );
    background: -webkit-gradient(
      left top,
      right bottom,
      color-stop(0%, rgba(255, 154, 158, 1)),
      color-stop(100%, rgba(254, 207, 239, 1))
    );
    background: -webkit-linear-gradient(
      -45deg,
      rgba(255, 154, 158, 1) 0%,
      rgba(254, 207, 239, 1) 100%
    );
    background: -o-linear-gradient(
      -45deg,
      rgba(255, 154, 158, 1) 0%,
      rgba(254, 207, 239, 1) 100%
    );
    background: -ms-linear-gradient(
      -45deg,
      rgba(255, 154, 158, 1) 0%,
      rgba(254, 207, 239, 1) 100%
    );
    background: linear-gradient(
      135deg,
      rgba(255, 154, 158, 1) 0%,
      rgba(254, 207, 239, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff9a9e', endColorstr='#fecfef', GradientType=1 );
  }

  &.blue {
    background: rgba(19, 84, 122, 1);
    background: -moz-linear-gradient(
      45deg,
      rgba(19, 84, 122, 1) 0%,
      rgba(128, 208, 199, 1) 100%
    );
    background: -webkit-gradient(
      left bottom,
      right top,
      color-stop(0%, rgba(19, 84, 122, 1)),
      color-stop(100%, rgba(128, 208, 199, 1))
    );
    background: -webkit-linear-gradient(
      45deg,
      rgba(19, 84, 122, 1) 0%,
      rgba(128, 208, 199, 1) 100%
    );
    background: -o-linear-gradient(
      45deg,
      rgba(19, 84, 122, 1) 0%,
      rgba(128, 208, 199, 1) 100%
    );
    background: -ms-linear-gradient(
      45deg,
      rgba(19, 84, 122, 1) 0%,
      rgba(128, 208, 199, 1) 100%
    );
    background: linear-gradient(
      45deg,
      rgba(19, 84, 122, 1) 0%,
      rgba(128, 208, 199, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#13547a', endColorstr='#80d0c7', GradientType=1 );
  }

  &.green {
    background: rgba(183, 248, 219, 1);
    background: -moz-linear-gradient(
      -45deg,
      rgba(183, 248, 219, 1) 0%,
      rgba(80, 167, 194, 1) 100%
    );
    background: -webkit-gradient(
      left top,
      right bottom,
      color-stop(0%, rgba(183, 248, 219, 1)),
      color-stop(100%, rgba(80, 167, 194, 1))
    );
    background: -webkit-linear-gradient(
      -45deg,
      rgba(183, 248, 219, 1) 0%,
      rgba(80, 167, 194, 1) 100%
    );
    background: -o-linear-gradient(
      -45deg,
      rgba(183, 248, 219, 1) 0%,
      rgba(80, 167, 194, 1) 100%
    );
    background: -ms-linear-gradient(
      -45deg,
      rgba(183, 248, 219, 1) 0%,
      rgba(80, 167, 194, 1) 100%
    );
    background: linear-gradient(
      135deg,
      rgba(183, 248, 219, 1) 0%,
      rgba(80, 167, 194, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b7f8db', endColorstr='#50a7c2', GradientType=1 );
  }
}
</style>
