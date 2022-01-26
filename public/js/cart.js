let isCartHidden = true;

export function btnCart() {
    // Situação: Achar por id
    const cart = $("#cart-body") 
    isCartHidden = !isCartHidden
    // Situação: Alterar CSS
    cart.css("display", isCartHidden == true ? "none" : 'grid')
}

export function updateCart(price, name) {
    // Situação: Achar por id
    const cart = $('#cart-body') 
    // Situação: Adicionar html interno
    cart.append(`<span class="cart-product-name">${name.text()}</span><span class="cart-product-price">$${price}</span>`) 
}

