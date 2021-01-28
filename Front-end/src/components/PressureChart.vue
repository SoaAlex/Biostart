<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["data", "options"],

  mounted() {
    this.renderLineChart();
  },
  computed: {
    chartData: function() {
      return this.data;
    }
  },
  methods: {
    renderLineChart: function() {
      this.renderChart(
        {
          labels: this.dataChart[0],
          datasets: [
            {
              label: "Pression Amont (mbar)",
              data: this.dataChart[1],
              backgroundColor: "transparent",
              borderColor: "rgba(116, 0, 0, 0.50)",
              pointBackgroundColor: "rgba(171, 71, 188, 1)"
            },
            {
              label: "Pression Aval (mbar)",
              data: this.dataChart[2],
              backgroundColor: "transparent",
              borderColor: "rgba(1, 116, 188, 0.50)",
              pointBackgroundColor: "rgba(171, 71, 188, 1)"
            }
          ]
        },
        { responsive: true, maintainAspectRatio: false }
      );
    }
  },
  watch: {
    data: function() {
      this._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.renderLineChart();
    }
  }
};
</script>
