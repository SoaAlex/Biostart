<template>
  <div class="Monitoring">
    <b-container fluid="xl">
      <b-row>
        <b-col sm="8">
          Débit en amont
          <FlowChart height="148px" />
          <PressureChart
            :data="dataChart"
            :options="{ responsive: true, maintainAspectRatio: false }"
            height="190"
          />
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
import PressureChart from "@/components/PressureChart.vue";
import FlowChart from "@/components/FlowChart.vue";
import Statistics from "@/components/Statistics.vue";

export default {
  name: "Monitoring",
  components: {
    PressureChart,
    Statistics,
    FlowChart
  },
  data: function() {
    return {
      dataChart: [[""], [0], [0]]
    };
  },
  methods: {
    update: function() {
      this.axios
        .get(this.$store.state.serverIP + "/data-pressure")
        .then(response => (this.dataChart = response.data));
    }
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
