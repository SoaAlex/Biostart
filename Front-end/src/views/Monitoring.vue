<template>
  <div class="Monitoring">
    <b-container fluid="xl">
      <b-row>
        <b-col sm="8">
          <FlowChart />
          <PressureChart />
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
