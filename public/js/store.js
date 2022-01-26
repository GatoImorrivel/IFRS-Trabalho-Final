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

    console.log('wtf')

    const mainDiv = document.getElementById('main')

    if(!snapshot.exists()) {
        console.log('no data in database')
        return
    }

    const data = snapshot.val()
    const propertiesName = Object.keys(data)
    const numberOfDivs = Math.ceil(propertiesName.length / 3);

    for (let i = 0; i < numberOfDivs; i++) {
        const div = document.createElement('div')
        div.classList.add('product-row')
        mainDiv.appendChild(div) 

        for (let x = 0; x < 3; x++) {
            const currentProductIndex = x + (3 * i)
            if (currentProductIndex > propertiesName.length - 1) {
                break
            }
            const obj = data[propertiesName[currentProductIndex]]
            Product(obj.name, obj.description, obj.price, obj.image, propertiesName[currentProductIndex], div)
        }
    }
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
        const name = $('#nameInput')
        const description = $('#descriptionInput')
        const price = $('#precoInput')
        const imageData = $('#file-display-img')
        const imageInput = $('#imageInput')

        appendToDatabase(name.val(), description.val(), price.val(), imageData.attr('src'))

        name.val('')
        description.val('')
        price.val('')
        imageData.attr('src', '')
        imageInput.val('')
    })
})
