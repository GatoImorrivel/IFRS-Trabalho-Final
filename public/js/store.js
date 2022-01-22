const jqueryScript = document.createElement('script')
jqueryScript.src = 'https://code.jquery.com/jquery-3.4.1.min.js'
jqueryScript.type = 'text/javascript'
document.getElementsByTagName('head')[0].appendChild(jqueryScript)

let cartHidden = true

function btnCart() {
    // Situação: Achar por id
    const cart = $("#cart-body") 
    cartHidden = !cartHidden
    // Situação: Alterar CSS
    cart.css("display", cartHidden == true ? "none" : "grid")
}

function updateProduct(price, image) {
    // Situação: Alterar imagem
    image.attr("src","./img/sold_banner.png")
    // Situação: Alterar html interno
    price.parent().html('')
}

function updateCart(price, name) {
    // Situação: Achar por id
    const cart = $("#cart-body") 
    // Situação: Adicionar html interno
    cart.append(`<span class="cart-product-name">${name.text()}</span><span class="cart-product-price">$${price}</span>`) 
}

function btnClicked(button) {
    // Situação: Achar por tag
    const image = $(button).parent().parent().find('img')
    // Situação: Achar por classe
    const name = $(button).parent().parent().find(".title-product")
    // Situação: Achar por classe
    const price = $(button).parent().find(".price-product").find(".white")
    // Situação: Pegar html interno
    const priceFloat = Number.parseFloat(price.html()).toFixed(2)

    button.value = "Sold!"
    button.style.color = "#F00"
    button.disabled = true

    updateProduct(price, image)
    updateCart(priceFloat, name)
}

function mostrarAtt() {
    alert("Estou usando os seguintes metodos: \n getElementsByTagName \n getElementsByClassName \n getElementById")
    alert("getElementsByTagName está sendo usado para pegar a imagem do produto escolhido pelo usuario")
    alert("getElementsByClassName está sendo usado para pegar o titulo e o preço do produto clicado pelo usuario")
    alert("getElementById está sendo usado para acessar o corpo do carrinho")
}