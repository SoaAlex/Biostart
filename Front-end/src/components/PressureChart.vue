<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          "11:48:21",
          "11:49:21",
          "11:50:21",
          "11:51:21",
          "11:52:21",
          "11:53:21",
          "11:54:21",
          "11:55:21",
          "11:56:21",
          "11:57:21",
          "11:58:21",
          "11:59:21",
          "12:00:21",
          "12:01:21",
          "12:02:21",
          "12:03:21",
          "12:04:21",
          "12:05:21",
          "12:06:21",
          "12:07:21",
          "12:08:21",
          "12:09:21",
          "12:10:21",
          "12:11:21",
          "12:12:21",
          "12:13:21",
          "12:14:21",
          "12:15:21",
          "12:16:21",
          "12:17:21"
        ],
        datasets: [
          {
            label: "Pression Amont (mbar)",
            data: [
              4,
              4,
              4,
              4,
              4,
              75,
              78,
              77,
              76,
              61,
              60,
              60,
              94,
              130,
              102,
              91,
              78,
              79,
              85,
              83,
              87,
              94,
              92,
              93,
              94,
              96,
              95,
              95,
              95,
              96
            ],
            backgroundColor: "transparent",
            borderColor: "rgba(116, 0, 0, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          },
          {
            label: "Pression Aval (mbar)",
            data: [
              24,
              24,
              24,
              24,
              24,
              99,
              135,
              132,
              131,
              74,
              73,
              73,
              92,
              856,
              879,
              185,
              85,
              86,
              90,
              89,
              1289,
              154,
              152,
              153,
              152,
              152,
              152,
              152,
              152,
              152
            ],
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
  data: function() {
    return {
      config: /* Papa Parse config object */ {
        delimiter: "", // auto-detect
        newline: "", // auto-detect
        quoteChar: '"',
        escapeChar: '"',
        header: true,
        dynamicTyping: true,
        preview: 0,
        encoding: "",
        delimitersToGuess: [",", "\t", "|", ";"]
        // ?? callback function ??
      },
      availability: {}
    };
  }
};
</script>
