const shoppingCart = []

const displayShoppingCart = () => {
    const cartEl = document.querySelector("#cartItems")
    cartEl.innerHTML = ""

    let grandTotal = 0

    shoppingCart.forEach((product, idx) => {
        // creates the html for dropdown option tags from 1 to the amount of the product in the cart
        let removeQtyDropdownHTML = "";
        for (let i = 1; i <= product.counter; i++) {
            removeQtyDropdownHTML += `<option value=${i}>${i}</option>`
        }
        
        // product.counter added to keep track of how many in of each item in the cart. price changed to total price to reflect the number of the product in the cart. 
        // removeQtyDropdownHTML inserted so that each dropdown only goes as high as the quantity of each product in the cart
        cartEl.innerHTML +=
            `
        <section class="shoppingCart__item">
        <div>${product.name} ${product.counter}</div>
        <div>${product.totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })}</div>

        
        <select id="dropdown${idx}">
            ${removeQtyDropdownHTML}
        </select>
        <button id="removeQty${idx}" class="cart_removeQtyButton">Remove Qty</button>
        <button id="${idx}" class="cart_removeButton">Remove All</button>
        </section>
        `

        grandTotal += product.totalPrice;
    })
    // empty shopping cart button added
    cartEl.innerHTML += `
      <h3 class="orderTotalPrice">You owe us: ${grandTotal.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })}</h3>
    <button id="emptyShoppingCart">Remove All Items From Cart</button>
    `

    // Get a reference to all buttons
    const allRemoveButtons = document.querySelectorAll(".cart_removeButton")
    const allremoveQtyButtons = document.querySelectorAll(".cart_removeQtyButton")

    // Add a click event listener to each button
    for (const button of allRemoveButtons) {
        button.addEventListener(
            "click",
            (event) => {
                const indexToRemove = parseInt(event.target.id)
                shoppingCart[indexToRemove].counter = 0;
                shoppingCart.splice(indexToRemove, 1)
                displayShoppingCart()
            }
        )
    }
    // this creates a button to remove the quantity (from the dropdown) of an item from the cart
    for (const button of allremoveQtyButtons) {
        button.addEventListener(
            "click",
            (event) => {
                // strips excess text to get down to the products index in the shopping cart
                let shortenedIdIndex = event.target.id.replace("removeQty", "")
                let removeDropdownQtyValue = parseInt(document.querySelector(`#dropdown${shortenedIdIndex}`).value);
                // removes a quantity less than the total quantity in the cart
                if (shoppingCart[shortenedIdIndex].counter > removeDropdownQtyValue) {
                    shoppingCart[shortenedIdIndex].counter -= removeDropdownQtyValue;
                    shoppingCart[shortenedIdIndex].totalPrice -= (shoppingCart[shortenedIdIndex].price * removeDropdownQtyValue);
                    displayShoppingCart()
                } else {
                    // removes the item from the shopping cart if the entire qty is removed
                    shoppingCart[shortenedIdIndex].counter = 0;
                    shoppingCart.splice(shortenedIdIndex,1);
                    displayShoppingCart();
                }
            }
        )
    }
    // emptys the whole shopping cart if the button is clicked.
    document.querySelector("#emptyShoppingCart").addEventListener(
        "click",
        (event) => {
            // allows product to be re-entered into the cart after being removed
            shoppingCart.forEach(product => {
                product.counter = 0;
            });
            shoppingCart.splice(0,shoppingCart.length);
            displayShoppingCart();
        }
    )


}














