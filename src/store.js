import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    KanaTest: {
      view: "levels", // Which view to display - "levels", "input", or "stats"
      difficulty: 1, // Defined in `kana.js`
      running: false, // Test is running or not
      correct: 0, // Total correct answers for current test
      incorrect: 0, // Total incorrect answers for current test
      currentCPM: 0, // Average CPM for last test
      averageCPM: 0, // Average CPM for entire session
      testCount: 0 // Total number of tests taken
    }
  },
  mutations: {
    setView: function(state, newView) {
      state.KanaTest.view = newView;
    },
    setDifficulty: function(state, newDifficulty) {
      state.KanaTest.difficulty = newDifficulty;
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
    },
    updateAverageCPM: function(state, newAverage) {
      state.KanaTest.averageCPM = newAverage;
    },
    increaseGameCount: function(state) {
      state.KanaTest.testCount += 1;
    },
    resetTest: function(state) {
      state.KanaTest.currentCPM = 0;
      state.KanaTest.correct = 0;
      state.KanaTest.incorrect = 0;
    }
  },
  actions: {
    setView: function(context, payload) {
      context.commit("setView", payload.view);
    },
    setDifficulty: function(context, payload) {
      context.commit("setDifficulty", payload.difficulty);
    },
    startTest: function(context) {
      context.commit("startTest");
      context.commit("setView", "input");
    },
    stopTest: function(context) {
      context.commit("stopTest");
      context.commit("setView", "stats");
    },
    incrementCorrect: function(context) {
      context.commit("incrementCorrect");
    },
    incrementIncorrect: function(context) {
      context.commit("incrementIncorrect");
    },
    updateCurrentCPM: function(context, payload) {
      context.commit("updateCurrentCPM", payload.currentCPM);
    },
    updateAverageCPM: function(context, payload) {
      // Calculate the cumulative average
      const previousAverage = context.state.KanaTest.averageCPM;
      const previousGameCount = context.state.KanaTest.testCount;
      const previousSum = previousAverage * previousGameCount;
      const newSum = previousSum + payload.newCPM;
      const newAverage = newSum / (context.state.KanaTest.testCount + 1);

      context.commit("updateAverageCPM", newAverage);
    },
    increaseGameCount: function(context) {
      context.commit("increaseGameCount");
    },
    resetTest: function(context) {
      context.commit("resetTest");
    }
  }
});
