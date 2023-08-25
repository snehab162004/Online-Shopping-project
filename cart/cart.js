if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    // var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    // for (var i = 0; i < quantityInputs.length; i++) {
    //     var input = quantityInputs[i]
    //     input.addEventListener('change', quantityChanged)
    // }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

async function removeCartItem(event) {
    console.log(event);
    var buttonClicked = event.target;
    const id = buttonClicked.name;
    buttonClicked.parentElement.parentElement.remove();
    
    try {
        const res = await fetch(`http://localhost:3001/api/cart/delete/${id}`, {
            method: "DELETE"
        });

        const cartItems = await res.json();
        console.log(cartItems);
        updateCartTotal(cartItems);
    } catch (error) {
        console.log(error);
    }
}


function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    addItemToCart(title, price)
    updateCartTotal()
}

function addItemToCart( title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
}

// function display(title, price) {

// }

//     var cartRowContents = 
     
//     cartRow.innerHTML = cartRowContents
//     cartItems.append(cartRow)
//     cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
//     cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
// }

function updateCartTotal(cartItems) {
    const total = cartItems.reduce((val, acc) => {
        return val + acc.price
    }, 0)
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}


// const apiUrl = 'http://localhost:3001/getCart';

// fetch({
//     method: "GET",
//     url: apiUrl
// })
//   .then(response => {
//     response.json().then(console.log)
//     })
    
//   .catch(error => {
//     console.log(error);
//   });


function displayCartItems(cartItems) {
    const cartItemsContainer = document.querySelector('.cart-items');
    
    cartItemsContainer.innerHTML = '';
    
    

    cartItems.forEach(item => {
        console.log(item)
      const cartRow = document.createElement('div');
      cartRow.classList.add('cart-row');
      
      const cartRowContents = `  <div class="cart-item cart-column">
      <span class="cart-item-title">${item?.title}</span>
  </div>
  <span class="cart-price cart-column">$${item?.price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button" name="${item?._id}">REMOVE</button>
  </div> `
      cartRow.innerHTML = cartRowContents;
      cartItemsContainer.appendChild(cartRow);
  
      cartRow.querySelector('.btn-danger').addEventListener('click', (e) => removeCartItem(e));
    //   cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);
    });
  
    // Update the total cart price after displaying all items

    updateCartTotal(cartItems)
  }
  
//   function fetchAndDisplayCartItems() {
//     const apiUrl = 'http://localhost:3001/getCart';
  
//     fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => {
//         displayCartItems(data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
  
  // Call the fetchAndDisplayCartItems function to display the cart items
//   fetchAndDisplayCartItems();


  function fetchAndDisplayCartItems() {

  const apiUrl = 'http://localhost:3001/getCart';

fetch(apiUrl)
  .then(response => {
    response.json()
    // .then(console.log)        
    .then(data => {
        displayCartItems(data);
    })
    })
    
  .catch(error => {
    console.log(error);
  });
}
fetchAndDisplayCartItems();
