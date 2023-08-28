import "./style.css";

// url path dynamic import js
const url = new URL(window.location.href);
const chartName = url.pathname.split("/")[1];
const chartPath = `./${chartName}/index.ts`;

// import chart
/* @vite-ignore */
import(chartPath).then((chart) => {
  chart.default();
});
