import Chart from "chart.js/auto";
import {
  topojson,
  ChoroplethController,
  ProjectionScale,
  ColorScale,
  GeoFeature,
} from "chartjs-chart-geo";

export default async function () {
  Chart.register(ChoroplethController, ProjectionScale, ColorScale, GeoFeature);

  const ctx = document.getElementById("myChart")! as HTMLCanvasElement;

  fetch("https://unpkg.com/us-atlas/states-10m.json")
    .then((r) => r.json())
    .then((us) => {
      console.log(us);
      const nation = topojson.feature(us, us.objects.nation).features[0];
      const states = topojson.feature(us, us.objects.states).features;

      console.log("nation", nation);
      console.log("states", states);

      const chart = new Chart(ctx, {
        type: "choropleth",
        data: {
          labels: states.map((d) => d.properties.name),
          datasets: [
            {
              label: "States",
              outline: nation,
              data: states.map((d) => ({
                feature: d,
                value: Math.random() * 10,
              })),
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            projection: {
              axis: "x",
              projection: "albersUsa",
            },
            color: {
              axis: "x",
              quantize: 5,
              legend: {
                position: "bottom-right",
                align: "bottom",
              },
            },
          },
        },
      });
    });
}
