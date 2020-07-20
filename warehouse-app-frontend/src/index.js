document.addEventListener("DOMContentLoaded", () => {
    API.loadWarehouses();
    document.getElementById('warehouse-form').addEventListener('submit', API.addWarehouse);
  });