<template>
  <div class="statistics">
    <b-container fluid>
      <b-row>
        <b-col>
          <p>Active Biostart© Filter</p>
          <p class="big">Filter N°{{ activeFilter }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Current Pressure</p>
          <p class="big">{{ currPressure }} BAR</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Current Flow</p>
          <p class="big">{{ currFlow }} L³/s</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Total volume filtered</p>
          <p class="big">{{ totalFiltered }} L³</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Remaining filtering capacity</p>
          <p class="big warning">{{ remainingCapacity }} L³</p>
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
      currPressure: 5,
      currFlow: 36,
      totalFiltered: 12863,
      remainingCapacity: 3,
      activeFilter: 1
    };
  },
  created() {
    setInterval(this.update, 5000);
  },
  methods: {
    update: function() {
      this.axios
        .get("http://192.168.1.10:3000/filtering")
        .then(response => (this.totalFiltered = response.data));
    }
  }
};
</script>

<style scoped>
.big {
  margin-top: -10px;
  /*margin-bottom: 35px;*/
  font-size: x-large;
  color: #00b900;
  background-color: #000000;
}

.warning {
  color: #ffffff !important;
  background-color: #ff0000;
}
</style>
