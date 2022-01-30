import { updateCart } from './cart.js' 
import { removeFromDatabase } from './database.js'

let isFormHidden = true

/**
 * Generates HTML for a given product
 * @param {String} name 
 * @param {String} description 
 * @param {Number} price 
 * @param {String} imageData 
 */
export const Product = (name, description, price, imageData, creatorName, key, parentDiv) => {
    // product div
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
    const creatorDiv = document.createElement('div')
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
    creatorDiv.classList.add('creator-div')

    // setando HTML
    titleDiv.innerHTML = name
    priceDiv.innerHTML = `Price: $<span class="white">${price}</span>`
    descriptionDiv.innerHTML = description

    creatorDiv.innerHTML = `Created by: <span class="white">${creatorName}</span>`

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
    fieldDiv.appendChild(creatorDiv)
    fieldDiv.appendChild(buttonsDiv)

    productDiv.appendChild(fieldDiv)

    parentDiv.appendChild(productDiv)

    console.log('Created: ' + name)
}

export const showAddForm = () => {
    const name = $('#nameInput')
    const description = $('#descriptionInput')
    const price = $('#precoInput')
    const imageData = $('#file-display-img')
    const imageInput = $('#imageInput')

    name.val('')
    description.val('')
    price.val('')
    imageData.attr('src', '')
    imageInput.val('')

    // Situação: Achar por id
    isFormHidden = !isFormHidden
    // Situação: Alterar atributo
    document.getElementById('form').hidden = isFormHidden
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

/**
 * Callback function for when the buy button is pressed in a product
 * @param {HTMLElement} button 
 */
function btnClicked(button) {
    // Situação: Achar por tag
    const image = $(button.target).parent().parent().parent().find('.img-wrapper').find('img') 
    // Situação: Achar por classe
    const name = $(button.target).parent().parent().find('.title-product')
    // Situação: Achar por classe
    const price = $(button.target).parent().parent().find('.price-product').find('.white')
    // Situação: Pegar html interno
    const priceFloat = Number.parseFloat(price.html()).toFixed(2)

    button.target.value = 'In Cart'
    button.target.style.color = '#5d9b00'
    button.target.disabled = true

    updateProduct(price, image)
    updateCart(priceFloat, name)
}

const updateProduct = (price, image) => {
    // Situação: Alterar imagem
    image.addClass('grayout')
    // Situação: Alterar html interno
    price.parent().html('')
}
