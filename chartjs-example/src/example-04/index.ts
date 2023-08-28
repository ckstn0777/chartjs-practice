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

  fetch("https://unpkg.com/world-atlas/countries-50m.json")
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      const countries = topojson.feature(data, data.objects.countries).features;

      console.log("countries", countries);

      const chart = new Chart(ctx, {
        type: "choropleth",
        data: {
          labels: countries.map((d) => d.properties.name),
          datasets: [
            {
              label: "Countries",
              data: countries.map((d) => ({
                feature: d,
                value: Math.random(),
              })),
            },
          ],
        },
        options: {
          showOutline: true,
          showGraticule: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            projection: {
              axis: "x",
              projection: "equalEarth",
            },
          },
        },
      });
    });
}
