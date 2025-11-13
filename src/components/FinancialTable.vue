<script setup>
import { ref, onMounted } from "vue";
import FinancialTableRow from "./FinancialTableRow.vue";

const props = defineProps({
  jsonDataUrl: {
    type: String,
    required: true,
  },
});

const rawData = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedRowId = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(props.jsonDataUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    rawData.value = await response.json();
  } catch (err) {
    error.value = err.message || "Не удалось загрузить данные";
  } finally {
    loading.value = false;
  }
});


const toggleRow = (id) => {
  selectedRowId.value = selectedRowId.value === id ? null : id;
};
</script>

<template>
  <section class="financial-table-container">
    <h2>Финансовые показатели</h2>

    <div v-if="loading" class="status-message">Загрузка...</div>
    <div v-else-if="error" class="status-message error">
      Ошибка: {{ error }}
    </div>

    <table class="financial-table" v-else>
      <thead>
        <tr>
          <th class="financial-table__indicator">Показатель</th>
          <th class="financial-table__current-day">Текущий день</th>
          <th class="financial-table__yesterday">Вчера</th>
          <th class="financial-table__this-week">Этот день недели</th>
        </tr>
      </thead>
      <tbody>
        <FinancialTableRow
          v-for="item in rawData"
          :key="item.id"
          :item="item"
          :is-selected="selectedRowId === item.id"
          @toggle="toggleRow"
        />
      </tbody>
    </table>
  </section>
</template>

<style lang="scss" scoped>
.financial-table-container {
  margin: 0 auto;
  max-width: 50rem;
  font-family: "Roboto", sans-serif;

  .financial-table {
    &__current-day {
      background-color: #e3f2fd;
    }
  }

  h2 {
    margin-bottom: 16px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8px;
  }

  table thead tr {
    height: 3rem;
  }

  th {
    background-color: #fbfbfb;
    font-weight: 400;
    color: #474747;
    border: solid 4px #fff;
  }

  tr:hover:not(.chart-row) {
    background-color: #f9f9f9;
  }
}

.status-message {
  text-align: center;
  padding: 16px;
  color: #555;
}

.status-message.error {
  color: #d32f2f;
}
</style>
