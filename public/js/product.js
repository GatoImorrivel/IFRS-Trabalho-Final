import { btnClicked } from './cart.js' 
import { removeFromDatabase } from './database.js'

let isFormHidden = true

/**
 * Generates HTML for a given product
 * @param {String} name 
 * @param {String} description 
 * @param {Number} price 
 * @param {String} imageData 
 */
export const Product = (name, description, price, imageData, key) => {
    const mainDivRef = document.getElementById('main')

    // main div
    const productDiv = document.createElement('div')
    productDiv.classList.add('product')
    productDiv.setAttribute('id', key)

    // image portion
    const imageDiv = document.createElement('div')
    const image = document.createElement('img')
    image.classList.add('img-product')
    image.setAttribute('src', imageData)

    imageDiv.classList.add('img-wrapper')

    imageDiv.appendChild(image)
    productDiv.appendChild(imageDiv)

    // info portion
    const fieldDiv = document.createElement('div')
    const titleDiv = document.createElement('div')
    const descriptionDiv = document.createElement('div')
    const priceDiv = document.createElement('div')
    const inputBtn = document.createElement('input')
    const removeBtn = document.createElement('input')
    const buttonsDiv = document.createElement('div')


    // setando classes
    fieldDiv.classList.add('field-product')
    titleDiv.classList.add('title-product')
    descriptionDiv.classList.add('description-product')
    priceDiv.classList.add('price-product')
    inputBtn.classList.add('btn-buy')
    removeBtn.classList.add('btn-remove')
    buttonsDiv.classList.add('buttons-div')

    // setando HTML
    titleDiv.innerHTML = name
    priceDiv.innerHTML = `Price: $<span class="white">${price}</span>`
    descriptionDiv.innerHTML = description

    // setando input
    inputBtn.setAttribute('type', 'button')
    inputBtn.setAttribute('value', 'Buy it')
    inputBtn.addEventListener('click', btnClicked)
    buttonsDiv.appendChild(inputBtn)

    removeBtn.setAttribute('type', 'button')
    removeBtn.setAttribute('value', 'Remove')
    removeBtn.addEventListener('click', removeEvent)
    buttonsDiv.appendChild(removeBtn)

    fieldDiv.appendChild(titleDiv)
    fieldDiv.appendChild(descriptionDiv)
    fieldDiv.appendChild(priceDiv)
    fieldDiv.appendChild(buttonsDiv)

    productDiv.appendChild(fieldDiv)

    mainDivRef.appendChild(productDiv)
}

export const showAddForm = () => {
    // Situação: Achar por id
    isFormHidden = !isFormHidden
    // Situação: Alterar atributo
    document.getElementById('form').hidden = isFormHidden
} 

export const updateProduct = (price, image) => {
    // Situação: Alterar imagem
    image.attr('src','./img/sold_banner.png')
    // Situação: Alterar html interno
    price.parent().html('')
}

/**
 * Removes the parent product of the button
 * @param {HTMLElement} button 
 */
function removeEvent(button) {
    const productKey = button.target.parentElement.parentElement.parentElement.getAttribute('id')
    console.log(productKey)
    removeFromDatabase(productKey)
} 