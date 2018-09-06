import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    KanaTest: {
      difficulty: 1,
      averageCPM: 0,
      gameCount: 0,
      running: false,
      correct: 0,
      incorrect: 0,
      currentCPM: 0
    }
  },
  mutations: {
    increaseDifficulty: function(state) {
      state.KanaTest.difficulty += 1;
    },
    decreaseDifficulty: function(state) {
      state.KanaTest.difficulty -= 1;
    },
    increaseGameCount: function(state) {
      state.KanaTest.gameCount += 1;
    },
    updateAverageCPM: function(state, newAverage) {
      state.KanaTest.averageCPM = newAverage;
    },
    startTest: function(state) {
      state.KanaTest.running = true;
    },
    stopTest: function(state) {
      state.KanaTest.running = false;
    },
    incrementCorrect: function(state) {
      state.KanaTest.correct += 1;
    },
    incrementIncorrect: function(state) {
      state.KanaTest.incorrect += 1;
    },
    updateCurrentCPM: function(state, currentCPM) {
      state.KanaTest.currentCPM = currentCPM;
    }
  },
  actions: {
    increaseDifficulty: function(context) {
      context.commit("increaseDifficulty");
    },
    decreaseDifficulty: function(context) {
      context.commit("decreaseDifficulty");
    },
    increaseGameCount: function(context) {
      context.commit("increaseGameCount");
    },
    updateAverageCPM: function(context, payload) {
      // Calculate the cumulative average
      const previousAverage = context.state.KanaTest.averageCPM;
      const previousGameCount = context.state.KanaTest.gameCount;
      const previousSum = previousAverage * previousGameCount;
      const newSum = previousSum + payload.newCPM;
      const newAverage = newSum / (context.state.KanaTest.gameCount + 1);

      context.commit("updateAverageCPM", newAverage);
    },
    startTest: function(context) {
      context.commit("startTest");
    },
    stopTest: function(context) {
      context.commit("stopTest");
    },
    incrementCorrect: function(context) {
      context.commit("incrementCorrect");
    },
    incrementIncorrect: function(context) {
      context.commit("incrementIncorrect");
    },
    updateCurrentCPM: function(context, payload) {
      context.commit("updateCurrentCPM", payload.currentCPM);
    }
  }
});
