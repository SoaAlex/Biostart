<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data: function() {
    return {
      dataPressionAmont: [0],
      dataPressionAval: [0],
      dataTime: [""]
    };
  },
  methods: {
    update: function() {
      this.axios
        .get(this.$store.state.serverIP + "/data-pressure")
        .then(response => {
          (this.dataPressionAmont = response.data[0]),
            (this.dataPressionAval = response.data[1]),
            (this.dataTime = response.data[2]);
        });
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.dataTime,
        datasets: [
          {
            label: "Pression Amont (mbar)",
            data: this.dataPressionAmont,
            backgroundColor: "transparent",
            borderColor: "rgba(116, 0, 0, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          },
          {
            label: "Pression Aval (mbar)",
            data: this.dataPressionAval,
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false
        /*title: {
          display: true,
          text: "Pression"
        }*/
      }
    );
  },
  created() {
    setInterval(this.update, 5000);
  }
};
</script>
