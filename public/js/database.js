import { Product } from './product.js'

import { getDatabase, ref, child, get, push, update } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js'

/**
 * Takes a product object and writes it to the databas
 * @param {Object} objectToBeWritten 
 */
export const appendToDatabase = async (name, price, type ) => {
    const db = getDatabase()

    const postData = {
        name: name,
        price: price,
        type: type,
    }

    const postKey = push(child(ref(db), 'products')).key

    const updates = {}
    updates['/products/' + postKey] = postData

    return update(ref(db), updates)
}

export const fetchAllProductsAndDisplay = async () => {
    let data = await readFromDatabase()
    data.map(item => {
        console.log('balls')
    })
}

export const readFromDatabase = async () => {
    let data = [] 

    get(child(ref(getDatabase()), 'products'))
    .then((snapshot) => {
        data.push(snapshot.val().product)
        console.log(snapshot.val())
    })
    .catch((error) => {
        console.log("error: "+error)
    })
    return data
} 
