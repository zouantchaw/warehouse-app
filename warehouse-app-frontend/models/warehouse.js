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
  
  };