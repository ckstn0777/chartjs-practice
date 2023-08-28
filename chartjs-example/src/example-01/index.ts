import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";

export default async function () {
  // ul list hide
  // const ul = document.querySelector("ul")!;
  // ul.style.display = "none";

  // canvas
  const ctx = document.getElementById("myChart")! as HTMLCanvasElement;

  Chart.register(
    BarController,
    BarElement,
    LinearScale,
    CategoryScale,
    Legend,
    Tooltip,
    Colors
  );

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
