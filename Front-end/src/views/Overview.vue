<template>
  <div class="Overview">
    <p class="title">System overview</p>
    <img alt="Diagram" src="../assets/F1_Eau_F2_Eau.png" class="diagram" />
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
      pression_aval: 4
    };
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
  top: -212px;
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
  top: -136px;
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
  top: -173px;
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
