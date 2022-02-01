import { readUsers, databaseUrl } from './database.js'

//#region jquery
const jqueryScript = document.createElement('script')
jqueryScript.src = 'https://code.jquery.com/jquery-3.4.1.min.js'
jqueryScript.type = 'text/javascript'
document.getElementsByTagName('head')[0].appendChild(jqueryScript)
//#endregion

document.getElementById('result-text').hidden = true

window.localStorage.removeItem('user')

const sucessColor = '#0f0'
const errorColor = '#f00'

function defer(method) {
    if (window.jQuery) {
        method()
    } else {
        setTimeout(function () { defer(method) }, 50)
    }
}

defer(() => {
    console.log('balls')
    $('#form').submit(event => {
        event.preventDefault()
    })
    document.getElementById('btn-login').addEventListener('click', event => {
        const usernameRef = document.getElementById('userInput')
        const passwordRef = document.getElementById('passwordInput')
        const resultRef = document.getElementById('result-text')
        
        const user = {
            name: usernameRef.value,
            password: passwordRef.value
        }

        readUsers()
        .then(data => {
            let hasLogged = false
            if (data == null)
                return
            
            Object.keys(data).map(key => {
                const otherUser = {
                    name: data[key].name,
                    password: data[key].password
                }
                if (user.name == otherUser.name && user.password == otherUser.password) {
                    window.localStorage.setItem('user', key)
                    hasLogged = true
                    resultRef.hidden = false
                    resultRef.style.backgroundColor = sucessColor
                    resultRef.children[0].innerHTML = 'Logged in'
                    window.location = './store.html'
                }
            })

            if (!hasLogged) {
                resultRef.hidden = false
                resultRef.style.backgroundColor = errorColor
                resultRef.children[0].innerHTML = 'User doesnt exist. Maybe try registering it'
            }
        })
    })

    document.getElementById('btn-register').addEventListener('click', async event => {
        const usernameRef = document.getElementById('userInput')
        const passwordRef = document.getElementById('passwordInput')
        const resultRef = document.getElementById('result-text')

        const user = {
            name: usernameRef.value,
            password: passwordRef.value
        }

        let alreadyExists = false
        await readUsers()
        .then(data => {
            if (data == null) 
                return

            Object.keys(data).map(key => {
                if (user.name == data[key].name) {
                   alreadyExists = true 
                }
            })
        })

        if (alreadyExists) {
            resultRef.hidden = false
            resultRef.style.backgroundColor = errorColor
            resultRef.children[0].innerHTML = 'User already exists'
            return
        }

        if (user.name == '' || user.password == '') {
            resultRef.hidden = false
            resultRef.style.backgroundColor = errorColor
            resultRef.children[0].innerHTML = 'Invalid input'
            return
        }

        fetch(databaseUrl + 'users/.json', {
            method: 'POST',
            body: JSON.stringify(user)
        })
            .then(response => {
                response.json()
                    .then(data => {
                        resultRef.hidden = false
                        resultRef.style.backgroundColor = sucessColor
                        resultRef.children[0].innerHTML = 'Success'
                        window.localStorage.setItem('user', data.name)
                        window.location = './store.html'
                    })
                    .catch(error => {
                        console.log('error: ' + error)
                        resultRef.style.backgroundColor = errorColor
                        resultRef.children[0].innerHTML = 'Unknown error'
                    })
            })
            .catch(error => {
                resultRef.hidden = false
                resultRef.style.backgroundColor = errorColor
                resultRef.children[0].innerHTML = 'Couldnt create new user'
            })
    })
})