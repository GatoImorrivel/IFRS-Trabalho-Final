import { Product, showAddForm } from './product.js'
import { appendToDatabase } from './database.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js'
import { onValue, ref, getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js'
import { btnCart } from './cart.js'

//#region firebase init
const config = {
    apiKey: "AIzaSyAuloj5RA2ORM50R-XL6Rio-vjDZ5N2llQ",
    authDomain: "ifrs-hosting.firebaseapp.com",
    databaseURL: "https://ifrs-hosting-default-rtdb.firebaseio.com",
    projectId: "ifrs-hosting",
    storageBucket: "ifrs-hosting.appspot.com",
    messagingSenderId: "646686654170",
    appId: "1:646686654170:web:b19a15d44266f87abf2fe3",
    measurementId: "G-KXMPEBX8FY"
}

const app = initializeApp(config)
//#endregion
//#region jquery
const jqueryScript = document.createElement('script')
jqueryScript.src = 'https://code.jquery.com/jquery-3.4.1.min.js'
jqueryScript.type = 'text/javascript'
document.getElementsByTagName('head')[0].appendChild(jqueryScript)
//#endregion


onValue(ref(getDatabase(), 'products'), snapshot => {
    $('#main').html('')

    if(!snapshot.exists()) {
        return
    }

    const data = snapshot.val()
    const propertiesName = Object.keys(data)

    propertiesName.map(item => {
        const obj = data[item]
        Product(obj.name, obj.description, obj.price, obj.image, item)
    })
})

function defer(method) {
    if (window.jQuery) {
        method();
    } else {
        setTimeout(function() { defer(method) }, 50);
    }
}

defer(() => {
    $('#form').submit((event) => {
        event.preventDefault()
    })
    $('#btn-cart').on('click', btnCart)
    $('#btn-form').on('click', showAddForm)
    $('#form-close-btn').on('click', showAddForm)
    $('#imageInput').on('change', () => {
        const file = document.getElementById('imageInput').files[0]
        const displayArea = document.getElementById('file-display')
        const imageType = /image.*/

        if (file.type.match(imageType)) {
            const reader = new FileReader()

            reader.onload = event => {
                displayArea.innerHTML = ''

                const img = new Image()
                img.src = reader.result
                img.setAttribute('id', 'file-display-img')

                displayArea.appendChild(img)
            }

            reader.readAsDataURL(file)
        } else {
            displayArea.innerHTML = 'File not supported'
        }
    })
    $('#form-add-btn').on('click', () => {
        const name = $('#nameInput').val()
        const description = $('#descriptionInput').val()
        const price = $('#precoInput').val()
        const imageData = $('#file-display-img').attr('src')

        appendToDatabase(name, description, price, imageData)
    })
})
