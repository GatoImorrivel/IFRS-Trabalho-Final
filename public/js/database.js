import { getDatabase, ref, child, get, push, update, remove} from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js'

/**
 * Takes a product object and writes it to the databas
 * @param {String} name 
 * @param {String} description 
 * @param {Number} price 
 * @param {String} type 
 */
export const appendToDatabase = async (name, description, price, image) => {
    const db = getDatabase()

    const postData = {
        name: name,
        description: description,
        price: price,
        image: image,
    }

    const postKey = push(child(ref(db), 'products')).key

    const updates = {}
    updates['/products/' + postKey] = postData

    return update(ref(db), updates)
}

export const readFromDatabase = async () => {
    let data = [] 

    get(child(ref(getDatabase()), 'products'))
    .then((snapshot) => {
        data.push(snapshot.val().product)
    })
    .catch((error) => {
        console.log("error: "+error)
    })
    return data
} 

export const removeFromDatabase = key => {
    const db = getDatabase()
    const target = ref(db, 'products/' + key)
    console.log(target) 
    remove(target)
}
