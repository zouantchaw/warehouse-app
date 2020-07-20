class Warehouse {
    constructor(name, capacity=1, whsItems, id=null) {
      if(Object.keys(whsItems).length <= capacity) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.whsItems = whsItems;
        this.renderWarehouse();
      } else {
        throw new Error("whsItems list exceded Warehous's max capacity. Please try again with a shorter list.")
      };
    };

    // returns markup for a warehouseCard <div>
    warehouseCardHTML() {
        return `
        <h2>${this.name}</h2>
        <h4>Capacity: ${this.capacity}</h4>
        `
    };

    // sets up the container elements for the fetched Warehouse (and warehouseItem) data
    renderWarehouse() {
        const warehouseContainer = document.getElementById("warehouse-container");
        const warehouseCard = document.createElement("div");
        warehouseCard.setAttribute("class", "warehouse-card");
        warehouseCard.setAttribute("data-warehouse-id", this.id);
        warehouseCard.innerHTML += this.warehouseCardHTML();

        // create "Add Warehouse Item" button
        // button comes with event listener that invokes API.addWarehouseItem() when clicked
        const addWarehouseItem = document.createElement('button');
        addWarehouseItem.innerText = "Add Warehouse Item"
        addWarehouseItem.setAttribute("class", "add-warehouse-item-btn")
        addWarehouseItem.addEventListener("click", (e) => {
        e.preventDefault();
        API.addWarehouseItem(warehouseCard, this.id);
        });
        warehouseCard.appendChild(addWarehouseItem);

  
  };