import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    difficulty: 1,
    averageCPM: 0,
    gameCount: 0
  },
  mutations: {
    increaseDifficulty: function(state) {
      state.difficulty += 1;
    },
    decreaseDifficulty: function(state) {
      state.difficulty -= 1;
    },
    increaseGameCount: function(state) {
      state.gameCount += 1;
    },
    updateAverageCPM: function(state, newCPM) {
      const previousSum = state.averageCPM * state.gameCount;
      const newSum = previousSum + newCPM;
      state.averageCPM = newSum / (state.gameCount + 1);
    }
  },
  actions: {}
});
