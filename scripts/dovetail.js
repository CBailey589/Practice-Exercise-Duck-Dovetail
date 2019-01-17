/*
    Function to convert a JavaScript object representation
    of a product to an HTML representation
*/
displayShoppingCart();
    
const createProductHTML = product => `
    <section class="product">
      <header class="product__header">
        <h2>${product.name}</h2>
      </header>

      <p class="product__description">
        ${product.description}
      </p>

      <footer class="product__footer">
        Price: ${product.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })}

        <select id="dropdown${product.id}">
            <option value=1>1</option>
            <option value=2>2</option>
            <option value=3>3</option>
            <option value=4>4</option>
            <option value=5>5</option>
            <option value=6>6</option>
            <option value=7>7</option>
            <option value=8>8</option>
            <option value=9>9</option>
        </select>
        <button id="${product.id}" class="product__purchaseButton">Purchase</button>
      </footer>

    </section>
`



// Iterate all products
for (product of products) {
    // Create HTML representation
    const theProductHTML = createProductHTML(product)

    // Reference to container
    const containerEl = document.querySelector("#productList")

    // Update HTML of container
    containerEl.innerHTML += theProductHTML
}

// Get a reference to all purchase buttons
const allButtons = document.querySelectorAll(".product__purchaseButton")

// Add a click event listener to each button
for (button of allButtons) {
    button.addEventListener(
        "click",
        (event) => {
            // Find the product whose `id` property is equal to
            // the "id" attribute of the button that was clicked on
            const foundProduct = products.find((product) => {
                return parseInt(event.target.id) === product.id
            })

            // Only if something was found, add the object to the
            // shopping cart array
            if (foundProduct !== null) {
                let purchaseDropdownQtyValue = parseInt(document.querySelector(`#dropdown${foundProduct.id}`).value);
                foundProduct.counter = (foundProduct.counter + 1 || 1);
                if (foundProduct.counter !== 1) {
                    foundProduct.counter += (purchaseDropdownQtyValue - 1);
                    foundProduct.totalPrice += foundProduct.price * purchaseDropdownQtyValue;
                }
                if (foundProduct.counter === 1) {
                    foundProduct.counter += (purchaseDropdownQtyValue - 1);
                    foundProduct.totalPrice = foundProduct.price * purchaseDropdownQtyValue;
                    shoppingCart.push(foundProduct)
                }
            }
            displayShoppingCart()
        }
    )

}















