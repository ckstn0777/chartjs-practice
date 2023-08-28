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

  fetch("siheung.json")
    .then((r) => r.json())
    .then((data) => {
      console.log(data);

      const nation = topojson.feature(data, data.objects.siheung).features[0];
      const states = topojson.feature(data, data.objects.siheung).features;

      console.log("nation", nation);
      console.log("states", states);

      const chart = new Chart(ctx, {
        type: "choropleth",
        data: {
          labels: states.map((d) => d.properties.adm_nm),
          datasets: [
            {
              label: "States",
              outline: nation,
              data: states.map((d) => ({
                feature: d,
                value: d.properties.population,
              })),
            },
          ],
        },
        options: {
          showOutline: false,
          showGraticule: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            projection: {
              axis: "x",
              projection: "mercator",
              projectionScale: 1, // 스케일 배율 조절하는게 아닌가?
              projectionOffset: [50, -150], // 원점 조절
              padding: 210, // 차트의 크기 조절?
            },
            // color: {
            //   axis: "x",
            //   quantize: 5,
            //   legend: {
            //     position: "bottom-right",
            //     align: "bottom",
            //   },
            // },
          },
        },
      });
    });
}
