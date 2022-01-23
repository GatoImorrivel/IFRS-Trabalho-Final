/**
 * Generates html for a product
 * @param {Object} productTobeRendered 
 */
export const Product = ({ name, price, type }) => {
    const mainDivRef = document.getElementById('main')

    // main div
    const productDiv = document.createElement('div')
    productDiv.classList.add('product')

    // image portion
    const imageDiv = document.createElement('div')
    const image = document.createElement('img')
    image.classList.add('img-product')

    imageDiv.appendChild(image)
    productDiv.appendChild(imageDiv)

    // info portion
    const fieldDiv = document.createElement('div')
    const titleSpan = document.createElement('span')
    const descriptionP = document.createElement('p')
    const priceP = document.createElement('p')
    const priceSpan = document.createElement('span')
    const inputBtn = document.createElement('input')

    fieldDiv.classList.add('field-product')
    titleSpan.classList.add('title-product')
    descriptionP.classList.add('description-product')
    priceSpan.classList.add('price-product')

    titleSpan.innerHTML = name
    priceSpan.innerHTML = `Price: $<span class="white">${price}</span>`

    fieldDiv.appendChild(titleSpan)
    fieldDiv.appendChild(descriptionP)
    fieldDiv.appendChild(priceP)
    priceP.appendChild(priceSpan)
    fieldDiv.appendChild(inputBtn)

    productDiv.appendChild(fieldDiv)

    mainDivRef.appendChild(productDiv)
}

export function updateProduct(price, image) {
    // Situação: Alterar imagem
    image.attr('src','./img/sold_banner.png')
    // Situação: Alterar html interno
    price.parent().html('')
}
