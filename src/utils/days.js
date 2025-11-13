export const WEEK_DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

/**
 * Преобразует индекс дня недели из формата JavaScript (где воскресенье = 0)
 * в индекс, где понедельник = 0, воскресенье = 6.
 * @param {number} getDayResult - Результат вызова `Date.prototype.getDay()`
 * @returns {number} Нормализованный индекс (0 — понедельник, ..., 6 — воскресенье).
 */
const normalizeDayIndex = (getDayResult) => {
  return getDayResult === 0 ? 6 : getDayResult - 1;
};

/**
 * Возвращает название текущего дня недели на основе переданной даты.
 * @param {Date} [date=new Date()] - Дата, для которой определяется день недели.
 * @returns {string} Название дня недели в нижнем регистре:
 */
export const getDayName = (date = new Date()) => {
  const dayIndex = date.getDay();
  const normalizedIndex = normalizeDayIndex(dayIndex);
  return WEEK_DAYS[normalizedIndex];
};

/**
 * Возвращает название предыдущего дня недели (вчера) относительно переданного дня.
 * @param {string} todayName - Название текущего дня недели.
 * @returns {string} Название предыдущего дня недели.
 */
export const getYesterdayName = (todayName) => {
  const todayIndex = WEEK_DAYS.indexOf(todayName);
  const yesterdayIndex = (todayIndex - 1 + 7) % 7;
  return WEEK_DAYS[yesterdayIndex];
};