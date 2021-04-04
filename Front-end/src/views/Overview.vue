<template>
  <div class="Overview">
    <p class="title">System overview</p>
    <img :src="imageSrc" alt="Diagram" class="diagram" />
    <!-- Absolute positionning of values -->
    <div class="debit-amont">{{ debit_amont }} M³/s</div>
    <div class="pression-amont">{{ pression_amont }} BAR</div>
    <div class="pression-aval">{{ pression_aval }} BAR</div>
  </div>
</template>

<script>
export default {
  name: "Overview",
  data: function() {
    return {
      debit_amont: 5,
      pression_amont: 7,
      pression_aval: 4,
      imageSrc: require("@/assets/Diagrammes/F1_Eau/F1_Eau.png")
    };
  },
  methods: {
    update: function() {
      // First get filter state
      this.axios
        .get(this.$store.state.serverIP + "/filter-state")
        .then(response => {
          if (response.data[0] == "WATER" && response.data[1] == "INACTIVE") {
            this.imageSrc = require("@/assets/Diagrammes/F1_Eau/F1_Eau.png");
          } else if (
            response.data[0] == "WATER" &&
            response.data[1] == "WATER"
          ) {
            this.imageSrc = require("@/assets/Diagrammes/F1_Eau_F2_Eau/F1_Eau_F2_Eau.png");
          } else if (
            response.data[0] == "WATER" &&
            response.data[1] == "CLEANING"
          ) {
            this.imageSrc = require("@/assets/Diagrammes/F1_Eau_F2_Net/F1_Eau_F2_Net.png"); // Fuck, j'ai oublié cette version
          } else if (
            response.data[0] == "CLEANING" &&
            response.data[1] == "INACTIVE"
          ) {
            this.imageSrc = require("@/assets/Diagrammes/F1_Net/F1_Net.png");
          } else if (
            response.data[0] == "CLEANING" &&
            response.data[1] == "WATER"
          ) {
            this.imageSrc = require("@/assets/Diagrammes/F1_Net_F2_Eau/F1_Net_F2_Eau.png");
          } else if (
            response.data[0] == "CLEANING" &&
            response.data[1] == "CLEANING"
          ) {
            this.imageSrc = require("@/assets/Diagrammes/F1_Net_F2_Net/F1_Net_F2_Net.png");
          } else if (
            response.data[0] == "INACTIVE" &&
            response.data[1] == "WATER"
          ) {
            this.imageSrc = require("@/assets/Diagrammes/F2_Eau/F2_Eau.png");
          } else if (
            response.data[0] == "INACTIVE" &&
            response.data[1] == "CLEANING"
          ) {
            this.imageSrc = require("@/assets/Diagrammes/F2_Net/F2_Net.png");
          } else if (
            response.data[0] == "INACTIVE" &&
            response.data[1] == "INACTIVE"
          ) {
            this.imageSrc = require("@/assets/Diagrammes/F1_F2/F1_F2.png");
          }
        });

      // Then get pressure and flow data
      this.axios
        .get(this.$store.state.serverIP + "/current-data")
        .then(response => {
          this.debit_amont = response.data[0];
          this.pression_amont = response.data[1];
          this.pression_aval = response.data[2];
        });
    }
  },
  created() {
    this.update();
    setInterval(this.update, this.$store.state.UPDATE_DELAY);
  }
};
</script>

<style scoped>
.diagram {
  max-width: 100%;
  margin-top: 0%;
}

.text {
  padding: 0%;
  color: #000000 !important;
  font-size: 20px;
  font-family: Monaco, monospace !important;
}

.debit-amont {
  position: relative;
  top: -211px;
  left: -44%;
  margin: 0;
  font-family: Monaco, monospace !important;
  font-weight: bold;
  font-size: 22px;
  letter-spacing: -1px;
  word-spacing: -5px;
  color: green;
}

.pression-amont {
  position: relative;
  top: -134px;
  left: -315px;
  margin: 0;
  font-family: Monaco, monospace !important;
  font-weight: bold;
  font-size: 25px;
  word-spacing: -10px;
  color: red;
}

.pression-aval {
  position: relative;
  top: -171px;
  left: 319px;
  margin: 0;
  font-family: Monaco, monospace !important;
  font-weight: bold;
  font-size: 25px;
  word-spacing: -10px;
  color: red;
}

.title {
  font-family: Monaco, monospace !important;
  font-size: 30px;
  font-weight: bold;
}
</style>
