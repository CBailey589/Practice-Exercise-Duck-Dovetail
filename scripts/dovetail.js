/*
    Function to convert a JavaScript object representation
    of a product to an HTML representation
*/

// Running this when the cart is empty to show the "you owe us" and "remove all items" when the page loads.
displayShoppingCart();
   
// Dropdown created with unique id to allow user to select qty of 1-9 to add to cart. Will be used with counter key created for products
// product rating creater inserted into footer to create the rating elements for each product.
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
      ${makeProductRatingHTML()}

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
                // gets value of dropdown next to purchase button
                let purchaseDropdownQtyValue = parseInt(document.querySelector(`#dropdown${foundProduct.id}`).value);
                // creates a counter key/value for each product that is put in the cart
                foundProduct.counter = (foundProduct.counter + 1 || 1);
                // if a product is already in the cart, this updates the qty and price within the cart
                // total price is created to display a total price for a product quantity higher than 1 in the cart
                if (foundProduct.counter !== 1) {
                    foundProduct.counter += (purchaseDropdownQtyValue - 1);
                    foundProduct.totalPrice += foundProduct.price * purchaseDropdownQtyValue;
                }
                // if the product is not in the cart, this adds it to the cart array, and updates the qty and price
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



// *****************NEED TO FIX THE EVENT LISTENERS FOR RATING BUTTONS****************************
// const allRadios = document.querySelectorAll(".rating").getElementsByName;
// console.log(allRadios);
// var prev = null;
// for (let i = 0; i < allRadios.length; i++) {
//     allRadios[i].addEventListener("change", function () {
//         console.log("SOMETHING HAPPENED")
//         (prev) ? console.log(prev.value) : null;
//         if (this !== prev) {
//             prev = this;
//         }
//         console.log(this.value)
//     });
// }












