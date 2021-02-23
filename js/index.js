const ctx = document.querySelector(".js-chart").getContext("2d");
const GLOBAL_MEAN_TEMPERATURE = 14;

fetchData()
  .then(parseData)
  .then(getLabelsAndData)
  .then(({ years, temps, northem, southem }) =>
    drawChart(
      years,
      temps,
      northem,
      southem,
      "rgba(255, 99, 132, 0.2)",
      "rgba(255, 99, 132, 0.2)",
      "rgba(255, 99, 132, 0.2)"
    )
  );

function fetchData() {
  return fetch("./ZonAnn.Ts+dSST.csv").then((response) => response.text());
}

function parseData(data) {
  return Papa.parse(data, { header: true }).data;
}

function getLabelsAndData(data) {
  return data.reduce(
    (acc, entry) => {
      acc.years.push(entry.Year);
      acc.temps.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);
      acc.northem.push(Number(entry.NHem) + GLOBAL_MEAN_TEMPERATURE);
      acc.southem.push(Number(entry.SHem) + GLOBAL_MEAN_TEMPERATURE);
      return acc;
    },
    { years: [], temps: [], northem: [], southem: [] }
  );
}

function drawChart(
  labels,
  data1,
  data2,
  data3,
  color1 = "rgba(255, 99, 132, 0.2)",
  color2 = "rgba(132, 99, 255, 0.2)",
  color3 = "rgba(99, 255, 145, 0.2)"
) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Global mean temperature,🌡",
          data: data1,
          backgroundColor: color1,
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "Global mean temperature,🌡",
          data: data2,
          backgroundColor: color2,
          borderColor: "rgba(132, 99, 255, 1)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "Global mean temperature,🌡",
          data: data3,
          backgroundColor: color3,
          borderColor: "rgba(99, 255, 145, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              // beginAtZero: true,
              callback(value, index, values) {
                return value + "°";
              },
            },
          },
        ],
      },
    },
  });
}
