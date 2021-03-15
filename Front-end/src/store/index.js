import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //serverIP: "http://192.168.1.10:3001", // PC Alex
    serverIP: "http://localhost:3001", // localhost
    FILTER_THRESHOLD: 0, // S'il reste 0 de capacité de filtration, nous avons atteint la limite
    UPDATE_DELAY: 3000 // Update les donées toutes les 5 sec
  },
  mutations: {},
  actions: {},
  modules: {}
});
