import { onBeforeUnmount } from 'vue';
import * as Highcharts from 'highcharts';

export function useHighcharts() {
  const charts = new Map();

  const renderChart = (containerId, options) => {
    destroyChart(containerId);
    charts.set(containerId, Highcharts.chart(containerId, options));
  };

  const destroyChart = (containerId) => {
    const chart = charts.get(containerId);
    if (chart) {
      chart.destroy();
      charts.delete(containerId);
    }
  };

  onBeforeUnmount(() => {
    charts.forEach(chart => chart.destroy());
    charts.clear();
  });

  return { renderChart, destroyChart };
}