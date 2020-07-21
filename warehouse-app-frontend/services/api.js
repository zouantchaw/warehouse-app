class API {
    // render all warehouses to index page 
    static loadWarehouses() {
      fetch(`http://localhost:3000/warehouses`)
        .then(res => res.json())
        .then(warehouseData => {
          for(let warehouse of warehouseData) {
            const {name, capacity, whs_items, id} = warehouse;
            new Warehouse(name, capacity, whs_items, id);
        }})
    };

    static addWarehouse(e) {
        e.preventDefault();
        let data = {
          'name': e.target.name[0].value,
          'capacity': parseInt(e.target.capacity.value),
          'whs_items_attributes': [{
            'name': e.target.name[1].value,
            'description': e.target.description.value,
            'price': parseInt(e.target.price.value),
            'quantity': parseInt(e.target.quantity.value)
          }]
        };
    
        fetch(`http://localhost:3000/warehouses`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(warehouse => {
            const {name, capacity, whs_items, id} = warehouse;
            new Warehouse(name, capacity, whs_items, id);
            document.getElementById('warehouse-form').reset();
          })
      };

    // delete our warehouses
    static deleteWarehouse(warehouseID) {
        fetch(`http://localhost:3000/warehouse/${warehouseID}`, {method: "DELETE"});
        document.getElementsByClassName('warehouse-card')[warehouseID-1].remove();
        return "The warehouse was deleted!";
    };

    static deleteWhsItem(whsItemID) {
        fetch(`http://localhost:3000/whs_items/${whsItemID}`, {method: "DELETE"});
        document.getElementById(whsItemID.toString()).remove();
        return "The whs item was deleted!";
    };   
  
};