// src/index.ts
function formatDate(date) {
  return date.toISOString().split("T")[0];
}
export {
  formatDate
};
