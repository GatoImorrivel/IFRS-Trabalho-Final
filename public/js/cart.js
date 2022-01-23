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

export function btnClicked(button) {
    // Situação: Achar por tag
    const image = $(button).parent().parent().find('img')
    // Situação: Achar por classe
    const name = $(button).parent().parent().find('.title-product')
    // Situação: Achar por classe
    const price = $(button).parent().find('.price-product').find('.white')
    // Situação: Pegar html interno
    const priceFloat = Number.parseFloat(price.html()).toFixed(2)

    button.value = 'Sold!'
    button.style.color = "#F00"
    button.disabled = true

    updateProduct(price, image)
    updateCart(priceFloat, name)
}
