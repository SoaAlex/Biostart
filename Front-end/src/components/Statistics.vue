<template>
  <div class="statistics">
    <b-container fluid>
      <b-row class="margin">
        <b-col>
          <p>Filter 1 state</p>
          <p class="big">{{ filterState[0] }}</p>
        </b-col>
      </b-row>
      <b-row class="margin">
        <b-col>
          <p>F1 Total volume filtere</p>
          <p class="big">{{ totalFiltered[0] }} L³</p>
        </b-col>
      </b-row>
      <b-row class="margin">
        <b-col>
          <p>F1 Remaining capacity</p>
          <p class="big">{{ remainingCapacity[0] }} L³</p>
        </b-col>
      </b-row>
      <hr class="line" />
      <b-row class="margin">
        <b-col>
          <p>Filter 2 state</p>
          <p class="big">{{ filterState[1] }}</p>
        </b-col>
      </b-row>
      <b-row class="margin">
        <b-col>
          <p>F2 Total volume filtered</p>
          <p class="big">{{ totalFiltered[1] }} L³</p>
        </b-col>
      </b-row>
      <b-row class="margin">
        <b-col>
          <p>F2 Remaining capacity</p>
          <p class="big warning">{{ remainingCapacity[1] }} L³</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "statistics",
  el: "statistics",
  data() {
    return {
      totalFiltered_1: ["", ""],
      remainingCapacity: ["", ""],
      filterState: ["", ""]
    };
  },
  created() {
    this.update();
    setInterval(this.update, 5000);
  },
  methods: {
    update: function() {
      this.axios
        .get(this.$store.state.serverIP + "/total-filtered")
        .then(response => (this.totalFiltered = response.data));
      this.axios
        .get(this.$store.state.serverIP + "/remaining-filter")
        .then(response => (this.remainingCapacity = response.data));
      this.axios
        .get(this.$store.state.serverIP + "/filter-state")
        .then(response => (this.filterState = response.data));
    }
  }
};
</script>

<style scoped>
.big {
  margin-top: -15px;
  /*margin-bottom: 35px;*/
  font-size: x-large;
  color: #00b900;
  background-color: #000000;
}

.warning {
  color: #ffffff !important;
  background-color: #ff0000;
}

.margin {
  margin-bottom: -10px;
}

.line {
  margin: 3px;
  margin-left: -10px;
  margin-right: -10px;
  border-top: 5px solid black;
}
</style>
