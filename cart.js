 //remove cart items after running 
 if (document.readyState == "loading"){
	document.addEventListener("DOMContentLoaded", ready)
 } else{
	ready()
 }

function ready(){
	var removeCartItemsButtons = document.getElementsByClassName('cart-product-remove')
	console.log(removeCartItemsButtons)
	for (var i = 0; i < removeCartItemsButtons.length; i++) {
		var button = removeCartItemsButtons[i]
		button.addEventListener('click', removeCartItem )		
	} 

	var quantityInputs = document.getElementsByClassName("cart-plus-minus-box")
	for (var i=0 ;i<quantityInputs.length;i++){
		var input = quantityInputs[i]
		input.addEventListener('change', quantityChanged)
	}

	var addToCartButtons = document.getElementsByClassName('addtocart')
		for (var i=0;i<addToCartButtons.length;i++){
			var button = addToCartButtons[i]
			button.addEventListener('click',addToCartClicked)
	}
}


function removeCartItem(event){
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.remove()
	updateCartTotal()
}

function quantityChanged(event){
	var input = event.target
	if (isNaN(input.value) || parseInt(input.value) <= 0 ){
		input.value = 1
	}
	updateCartTotal()
}

function addToCartClicked(event){ 
	var button = event.target
	var productItem = button.parentElement.parentElement
	var title = productItem.getElementsByClassName("product-title")[0].innerText
	var price  = productItem.getElementsByClassName('cart-product-price')[0].innerText
	var imageSrc = productItem.getElementsByClassName('product-img')[0].src
	//console.log(price,title,imageSrc)
	addItemToCart(title,price,imageSrc)
	updateCartTotal()

}

function addItemToCart(title, price, imageSrc){
	var cartRow = document.createElement('div')
	cartRow.classList.add('cart-row')
	var cartItems = document.getElementsByClassName('cart-items')[0]
	var cartItemNames = cartItems.getElementsByClassName('cart-product-info')
	for (var i = 0; i < cartItemNames.length ; i++){
		if (cartItemNames[i].innerText == title)
		alert ("This product is already added to the cart")
		return
	}
	
	// for (let item of cartItemNames){
	// 	if (item.innerText == title){
	// 		alert('This item is already added to the cart')
	// 		return
	// 	}
	// }
	var cartRowContents = ` 
			<tr class = "cart-row">
			<div class="cart-row">  
			<td class="cart-product-remove">
				<div class="cart-product-remove">
					x
				</div>
			</td>
			<td class="cart-product-image">
				<a><img src="${imageSrc}" alt="#"></a>
			</td>
			<td class="cart-product-info">
				<h4><a>${title}</a></h4>
			</td>
			<td class="cart-product-p">
				<div class="cart-product-price">${price }</div>
			</td>
			<td class="cart-product-quantity">
				<div class="cart-plus-minus cart-product-quantity">
					<input type="text" value="02" name="qtybutton" class="cart-plus-minus-box">
				</div>
			</td>
			<td class="cart-product-subtotal">₦298.00</td>
		</div>
		</tr>`
	cartRow.innerHTML = cartRowContents
	cartItems.append(cartRow)
	cartRow.getElementsByClassName('cart-product-remove')[0].addEventListener('click', removeCartItem)
	cartRow.getElementsByClassName('cart-plus-minus-box')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
	var cartItemContainer = document.getElementsByClassName('cart-items')[0]
	var cartRows = cartItemContainer.getElementsByClassName('cart-row')
	var total = 0
	console.log(cartRows)
	for (var i = 0; i < cartRows.length; i++) {
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName('cart-product-price')[0]
		// console.log(priceElement) // Add this line
		var quantityElement = cartRow.getElementsByClassName('cart-plus-minus-box')[0]
		var price = priceElement ? priceElement.innerText : 0; // Check if priceElement exists before accessing its innerText
		// console.log(priceElement, quantityElement) 
		var price = parseFloat(priceElement.innerText.replace('₦', ''))
		// console.log(price)
		var quantity = quantityElement.value
		// console.log(price*quantity)
		total = total + (price * quantity)
	}
	total = Math.round(total * 100) / 100
	document.getElementsByClassName('cart-total-price')[0].innerText = '₦' + total
} 

