import * as Highcharts from "highcharts";

const formatNumber = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

Highcharts.setOptions({
  lang: {
    locale: "ru-RU",
    thousandsSep: " ",
  },

  tooltip: {
    useHTML: true,
    formatter: function () {
      return `<b>${this.series.name}</b><br>${this.x}: ${formatNumber(this.y)}`;
    },
  },

  yAxis: {
    labels: {
      formatter: function () {
        return formatNumber(this.value);
      },
    },
  },

  xAxis: {
    labels: {
      formatter: function () {
        return typeof this.value === "number"
          ? formatNumber(this.value)
          : this.value;
      },
    },
  },

  chart: {
    style: {
      fontFamily: "'Roboto', sans-serif",
    },
  },
});
