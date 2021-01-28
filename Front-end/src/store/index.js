import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serverIP: "http://192.168.1.10:3000" // PC Alex
    //serverIP: "http://localhost:3000", // localhost
  },
  mutations: {},
  actions: {},
  modules: {}
});
