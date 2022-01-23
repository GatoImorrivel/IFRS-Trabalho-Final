import { Product } from './product.js'
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

    const data = snapshot.val()
    const propertiesName = Object.keys(data)
    propertiesName.map(item => {
        Product(data[item])
    })
})

document.getElementById('btn-cart').addEventListener('click', btnCart)

function mostrarAtt() {
    alert('Estou usando os seguintes metodos: \n getElementsByTagName \n getElementsByClassName \n getElementById')
    alert('getElementsByTagName está sendo usado para pegar a imagem do produto escolhido pelo usuario')
    alert('getElementsByClassName está sendo usado para pegar o titulo e o preço do produto clicado pelo usuario')
    alert('getElementById está sendo usado para acessar o corpo do carrinho')
}