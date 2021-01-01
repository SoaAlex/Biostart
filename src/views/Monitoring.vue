<template>
  <div class="Monitoring">
    <Navbar />
    <b-container fluid="xl">
      <b-row>
        <b-col sm="8">
          Débit en amont / aval
          <PressureChart height="148px" />
          Pression en amont / aval
          <PressureChart height="148px" />
        </b-col>
        <b-col sm="4">
          <Statistics />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import PressureChart from "@/components/PressureChart.vue";
import Statistics from "@/components/Statistics.vue";

export default {
  name: "Monitoring",
  components: {
    Navbar,
    PressureChart,
    Statistics
  }
};
</script>

<style scoped>
.centered {
  width: 100%;
  height: 50%;
  margin: 0;
  padding: 0;
}
</style>
