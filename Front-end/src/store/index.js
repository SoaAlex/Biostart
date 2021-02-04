import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //serverIP: "http://192.168.1.10:3001", // PC Alex
    serverIP: "http://localhost:3001", // localhost
    FILTER_THRESHOLD: 15, // Si il ne reste que 15L^3 de capacité de filtration, nous avons atteint la limite
    UPDATE_DELAY: 5000 // Update les donées toutes les 5 sec
  },
  mutations: {},
  actions: {},
  modules: {}
});
