<template>
  <div class="landing">
    <h1>Introducing Kanako <sub>(beta)</sub></h1>
    <h2>Master Hiragana and Katakana, the building blocks of the Japanese language</h2>

    <div class="kana-button-container">
    	<router-link to="/kana-test">
    		<KanaButton label="Start Kana Test"/>
    	</router-link>
    </div>
    <div class="kana-button-container">
      <router-link to="/kana-test">
        <KanaButton label="Learn Kana"/>
    	</router-link>
    </div>
  </div>
</template>

<script>
import KanaButton from "@/components/Global/KanaButton";

export default {
  name: "Landing",
  components: {
    KanaButton
  }
};
</script>
