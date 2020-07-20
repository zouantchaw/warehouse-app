class API {
    // render all warehouses index page
    static loadWarehouses() {
      fetch(`http://localhost:3000/warehouses`)
        .then(res => res.json())
        .then(warehouseData => {
          for(let whs of warehouseData) {
            const {name, capacity, whs_items, id} = whs;
            new Warehouse(name, capacity, whs_items, id);
        }})
    };