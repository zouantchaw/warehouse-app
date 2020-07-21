class Warehouse {
    constructor(name, capacity=1, whsItems, id=null) {
      if(Object.keys(whsItems).length <= capacity) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.whsItems = whsItems;
        this.renderWarehouse();
      } else {
        throw new Error("warehouseItems list exceded warehouses's max capacity. Please try again with a shorter list.")
      };
    };
  
    // returns markup for a warehouseCard <div>
    warehouseCardHTML() {
      return `
      <h2>${this.name}</h2>
      <h4>Capacity: ${this.capacity}</h4>
      `
    };
  
  
    // sets up the container elements for the fetched Warehouse (and WhsItem) data
    renderWarehouse() {
      const warehouseContainer = document.getElementById("warehouse-container");
      const warehouseCard = document.createElement("div");
      warehouseCard.setAttribute("class", "warehouse-card");
      warehouseCard.setAttribute("data-warehouse-id", this.id);
      warehouseCard.innerHTML += this.warehouseCardHTML();
  
      // create "Add Whs Item" button
      // button comes with event listener that invokes API.addWhsItem() when clicked
      const addWhsItem = document.createElement('button');
      addWhsItem.innerText = "Add Whs Item"
      addWhsItem.setAttribute("class", "add-whs-item-btn")
      addWhsItem.addEventListener("click", (e) => {
        e.preventDefault();
        API.addWhsItem(warehouseCard, this.id);
      });
      warehouseCard.appendChild(addWhsItem);
  
      // form for adding a new Whs item to the current warehouseCard
      let newWhsItemForm = document.createElement('form');
      newWhsItemForm.id = "new-whs-item-form";
      newWhsItemForm.innerHTML = `
      <input type="text" name="name" placeholder="whs name" />
      <br />
      <input type="text" name="description" placeholder="short description" />
      <br />
      <input type="number" name="price" placeholder="price per unit" />
      <br />
      <input type="number" name="quantity" placeholder="quantity" min=0 />
      <br />
      <input type="submit" value="Add Item" />
      `
  
      // form is attached to to current warehouseCard and set to "dislpay:none" by default
      // (changes to "dislpay: block" when clicked and back to "none" when submitted)
      newWhsItemForm.style.display="none";
      warehouseCard.appendChild(newWhsItemForm);
  
  
      // button for deleting the current warehouseCard when clicked
      // uses API.deleteWarehouse() to send AJAX request to Rails API to
      // delete warehouse from database
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.setAttribute("class", "warehouse-delete-btn");
      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        API.deleteWarehouse(parseInt(e.target.parentElement.getAttribute('data-warehouse-id')))
      });
      warehouseCard.appendChild(deleteBtn);
  
  
      // create "whs-items-container <div> for current warehouseCard"
      // invoke WhsItem.renderWhsItems() to populate the container
      const whsItemsContainer = document.createElement("div");
      whsItemsContainer.setAttribute("class", "whs-items-container");
  
      // render the whs items and then append to whsItemsContainer?
      // TODO: Build WhsItem.renderWhsItems(whsItemsContainer, this.whsItems) <-- returns updated copy of whsItemsContainer with added whs items
      // renderedWhsItems = WhsItem.renderWhsItems(whsItemsContainer, this.whsItems)
      // warehouseCard.appendChild(renderedWhsItems)
  
      const renderedWhsItems = WhsItem.renderWhsItems(whsItemsContainer, this.whsItems);
      warehouseCard.appendChild(renderedWhsItems);
  
  
      // finally, we append the warehouseCard to the existing warehouseContainer
      // it is now rendered
      warehouseContainer.appendChild(warehouseCard);
    };
  };