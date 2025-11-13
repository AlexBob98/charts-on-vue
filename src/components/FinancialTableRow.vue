<script setup>
import { computed } from "vue";
import { getDayName, getYesterdayName } from "@/utils/days";
import FinancialChart from "./FinancialChart.vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const todayDay = getDayName();
const yesterdayDay = getYesterdayName(todayDay);

const emit = defineEmits(["toggle"]);

const handleRowClick = () => {
  emit("toggle", props.item.id);
};

const hasData = computed(() => {
  return props.item?.summaryOnWeek;
});

const todayValue = computed(() => hasData.value ? props.item.summaryOnWeek[todayDay] ?? 0 : 0);
const yesterdayValue = computed(
  () => hasData.value ? props.item.summaryOnWeek[yesterdayDay] ?? 0 : 0,
);

const changeClass = computed(() => {
  if (hasData.value) {
    const today = todayValue.value;
    const yesterday = yesterdayValue.value;

  const change = ((today - yesterday) / yesterday) * 100;
  if (change > 0) return "positive";
  if (change < 0) return "negative";
  return "";
  };
});

const changeText = computed(() => {
  if (hasData.value) {
    const today = todayValue.value;
    const yesterday = yesterdayValue.value;

    if (yesterday === 0) {
      return today === 0 ? "0%" : today > 0 ? "+100%" : "-100%";
    }

  return `${Math.round(((today - yesterday) / yesterday) * 100)}%`;
  };
});

const isRevenue = computed(() => props.item.id === "revenue");
const weeklyTotal = computed(() => {
  if (hasData.value) {
    return Object.values(props.item.summaryOnWeek).reduce((a, b) => a + b, 0);
  };
});
</script>

<template>
  <template v-if="hasData">
    <tr @click="handleRowClick" :class="{ selected: isSelected }" class="data-row">
      <td class="label">{{ item.label }}</td>
      <td class="current-day-cell">
        {{ todayValue.toLocaleString("ru-RU") }}
      </td>
      <td class="yesterday" :class="changeClass">
        {{ yesterdayValue.toLocaleString("ru-RU") }}
        <small>{{ changeText }}</small>
      </td>
      <td :class="{ 'revenue-total': isRevenue }">
        {{ weeklyTotal.toLocaleString("ru-RU") }}
      </td>
    </tr>

    <tr class="chart-row" :class="{ 'chart-row--hidden': !isSelected }">
      <td colspan="4" class="chart-cell">
        <div class="chart-wrapper">
          <FinancialChart
            v-if="isSelected"
            :id="item.id"
            :name="item.label"
            :summary-on-week="item.summaryOnWeek"
          />
        </div>
      </td>
    </tr>
  </template>
</template>

<style lang="scss" scoped>
.data-row {
  cursor: pointer;

  &:hover td {
    background-color: #ededed;
  }

  .revenue-total {
    background-color: #ffebee;
  }

  th,
  td {
    border: solid 4px #fff;
    padding: 12px;
    text-align: right;
    color: #474747;
    background-color: #f7f7f7;
    transition: background-color 0.2s;

    &.current-day-cell {
      background-color: #e3f2fd;
    }
  }

  td {
    &:nth-child(1) {
      text-align: left;
    }

    small {
      margin-left: 6px;
      font-weight: 500;
      color: green;
    }

    &.positive {
      background-color: #e8f5e9;
    }

    &.negative {
      background-color: #ffebee;

      & small {
        color: red;
      }
    }
  }

  .chart-row {
    .chart-wrapper {
      transition: opacity 0.3s ease;
    }

    &.chart-row--hidden {
      &.chart-wrapper {
        opacity: 0;
      }
    }
  }
}

.chart-row--hidden {
  .chart-cell {
    padding: 0;
    height: 0;
    overflow: hidden;
    border-top: none;
    border-bottom: none;
  }
}

.chart-cell {
  padding: 12px 0;
  background-color: #fff;
  transition: padding 0.3s ease, height 0.3s ease;
  overflow: hidden;
}
</style>
