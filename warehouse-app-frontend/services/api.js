class API {
    // render all warehouses to index page 
    static loadFridges() {
      fetch(`http://localhost:3000/warehouses`)
        .then(res => res.json())
        .then(warehouseData => {
          for(let warehouse of warehouseData) {
            const {name, capacity, whs_items, id} = warehouse;
            new Warehouse(name, capacity, whs_items, id);
        }})
    };
  
  };