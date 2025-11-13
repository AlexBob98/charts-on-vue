<script setup>
import { onMounted } from 'vue';
import { useHighcharts } from '@/composable/useHighcharts';
import { getDayName, WEEK_DAYS } from '@/utils/days';

const props = defineProps({
  summaryOnWeek: {
    type: Object,
    required: true,
  },
  id: [String, Number],
  name: {
    type: String,
    default: 'Значение'
  },
});

const { renderChart } = useHighcharts();
const containerId = `chart-${props.id}`;

onMounted(() => {
  const todayName = getDayName();
  const todayIndex = WEEK_DAYS.indexOf(todayName);
  const visibleDays = WEEK_DAYS.slice(0, todayIndex + 1);
  const data = visibleDays.map(day => props.summaryOnWeek[day]);

  const categories = visibleDays.map(day => {
    const ru = {
      monday: 'Пн',
      tuesday: 'Вт',
      wednesday: 'Ср',
      thursday: 'Чт',
      friday: 'Пт',
      saturday: 'Сб',
      sunday: 'Вс'
    };
    return ru[day];
  });

  renderChart(containerId, {
    chart: { type: 'line', height: 250 },
    title: { text: null },
    xAxis: { categories },
    yAxis: { title: { text: null } },
    series: [{
      name: props.name,
      data,
      color: '#2e7d32'
    }],
    legend: { enabled: false },
    credits: { enabled: false },
  });
});

</script>

<template>
  <div :id="containerId" class="chart-container"></div>
</template>

<style scoped>
.chart-container {
  height: 250px;
  width: 100%;
}
</style>