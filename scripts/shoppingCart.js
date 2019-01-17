const shoppingCart = []

const displayShoppingCart = () => {
    const cartEl = document.querySelector("#cartItems")
    cartEl.innerHTML = ""

    let grandTotal = 0

    shoppingCart.forEach((product, idx) => {

        cartEl.innerHTML +=
            `
        <section class="shoppingCart__item">
        <div>${product.name} ${product.counter}</div>
        <div>${product.totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })}</div>

        
        <select id="dropdown${idx}">
            <option value=1>1</option>
            <option value=2>2</option>
            <option value=3>3</option>
        </select>
        <button id="removeQty${idx}" class="cart_removeQtyButton">Remove Qty</button>
        <button id="${idx}" class="cart_removeButton">Remove All</button>
        </section>
        `

        grandTotal += product.price
    })

    cartEl.innerHTML += `
      <h3>You owe us: ${grandTotal.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })}</h3>
    `

    // Get a reference to all purchase buttons
    const allRemoveButtons = document.querySelectorAll(".cart_removeButton")
    const allremoveQtyButtons = document.querySelectorAll(".cart_removeQtyButton")

    // Add a click event listener to each button
    for (const button of allRemoveButtons) {
        button.addEventListener(
            "click",
            (event) => {
                const indexToRemove = parseInt(event.target.id)
                shoppingCart.splice(indexToRemove, 1)
                displayShoppingCart()
            }
        )
    }
    for (const button of allremoveQtyButtons) {
        button.addEventListener(
            "click",
            (event) => {
                let shortenedIdIndex = event.target.id.replace("removeQty", "")
                let removeDropdownQtyValue = parseInt(document.querySelector(`#dropdown${shortenedIdIndex}`).value);
                if (shoppingCart[shortenedIdIndex].counter > removeDropdownQtyValue) {
                    shoppingCart[shortenedIdIndex].counter -= removeDropdownQtyValue;
                    shoppingCart[shortenedIdIndex].totalPrice -= (shoppingCart[shortenedIdIndex].price * removeDropdownQtyValue);
                    displayShoppingCart()
                } else {
                    shoppingCart[shortenedIdIndex].counter = 0;
                    shoppingCart.splice(shortenedIdIndex,1);
                    displayShoppingCart();
                }
            }
        )
    }


}














