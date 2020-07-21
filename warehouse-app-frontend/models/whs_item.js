class WhsItem {
    constructor(name, description, price, quantity) {
      this.name = name;
      this.description = description;
      this.price = price;
      this.quantity = quantity;
    };

    // returns today's date as a string in mm/dd/yyyy format
    static todaysDate() {
        let today = new Date()
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    // sorts a warehouses items by price
    static sortByPrice(items) {
        return items.sort((a, b) => parseInt(a.price) - parseInt(b.price))
    };


    // returns markup for a single item of a whsItemsCard <div>
    static whsItemsCardHTML(item) {
        return `
        <strong>${item.name}</strong> <br />
        <strong>Description: </strong>${item.description} <br />
        <strong>Price: </strong>${item.price} <br />
        <strong>Quantity: </strong>${item.quantity} <br />
        `
    };

    // given a whsItemsContainer and an array of item-object data,
    // this render
    static renderWhsItems(whsItemsContainer, items) {
        for(let item of this.sortByPrice(items)) {
        const {name, description, price, quantity} = item;
        let newWhsItem = new WhsItem(name, description, price, quantity);
        let whsItemCard = document.createElement("div");
        whsItemCard.setAttribute("class", "whs-item-card");
        whsItemCard.id = item.id;

        whsItemCard.innerHTML += this.whsItemsCardHTML(item);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete Item";
        deleteBtn.setAttribute("class", "whs-item-delete-btn");

        deleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            API.deleteWhsItem(parseInt(e.target.parentElement.id))
        });

        whsItemCard.appendChild(deleteBtn);
        whsItemsContainer.appendChild(whsItemCard);


        };
        return whsItemsContainer
    };


    // takes an item and warehouse and adds the item to that fridge
    static addItemToWarehouse(warehouse, item) {
        const {name, description, price, quantity} = item;
        const newWhsItem = new WhsItem(name, description, price, quantity);

        let whsItemsContainer = warehouse.querySelector(".whs-items-container");
        let whsItemCard = document.createElement('div');
        whsItemCard.setAttribute("class", "whs-item-card");

        whsItemCard.innerHTML += `
        <h4>${item.name}</h4>
        <br>
        <strong>Description: </strong> ${item.description} <br />
        <strong>Price: </strong> ${item.price} <br />
        <strong>Quantity: </strong> ${item.quantity} <br /><br />
        `


        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete Item";
        deleteBtn.setAttribute("class", "whs-item-delete-btn");
        deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        API.deleteWhsItem(parseInt(e.target.parentElement.id))
        });

        let linkBreak = document.createElement("br");
        whsItemCard.appendChild(deleteBtn);
        whsItemsContainer.appendChild(whsItemCard);

        warehouse.getElementsByTagName("form")[0].reset();
        warehouse.getElementsByTagName("form")[0].style.display="none";
    };

};