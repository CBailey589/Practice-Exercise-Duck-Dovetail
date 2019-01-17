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

        <button id="removeSingle${idx}" class="cart_removeSingleButton">Remove One</button>
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
    const allRemoveSingleButtons = document.querySelectorAll(".cart_removeSingleButton")

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
    for (const button of allRemoveSingleButtons) {
        button.addEventListener(
            "click",
            (event) => {
                let shortenedIdIndex = event.target.id.replace("removeSingle", "")
                console.log(shortenedIdIndex);
                if (shoppingCart[shortenedIdIndex].counter > 1) {
                    shoppingCart[shortenedIdIndex].counter--;
                    shoppingCart[shortenedIdIndex].totalPrice -= shoppingCart[shortenedIdIndex].price;
                    displayShoppingCart()
                } else {
                    shoppingCart.splice(shortenedIdIndex,1);
                    displayShoppingCart();
                }
            }
        )
    }


}














