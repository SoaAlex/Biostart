<template>
  <div>
    <line-chart :chart-data="datacollection" height="163px"></line-chart>
  </div>
</template>

<script>
import LineChart from "./LineChart.js";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: {
        labels: [""],
        datasets: [
          {
            label: "Upstream Flow (L³)",
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)",
            data: [""]
          }
        ]
      }
    };
  },
  mounted() {
    //this.update();
  },
  methods: {
    update: function() {
      this.axios
        .get(this.$store.state.serverIP + "/data-flow")
        .then(response => {
          this.datacollection = {
            labels: response.data[1],
            datasets: [
              {
                label: "Upstream Flow (L³)",
                backgroundColor: "transparent",
                borderColor: "rgba(1, 116, 188, 0.50)",
                pointBackgroundColor: "rgba(171, 71, 188, 1)",
                data: response.data[0]
              }
            ]
          };
        });
    }
  },
  created() {
    this.update();
    setInterval(this.update, this.$store.state.UPDATE_DELAY);
  }
};
</script>

<style>
.small {
  max-height: 100px;
}
</style>
