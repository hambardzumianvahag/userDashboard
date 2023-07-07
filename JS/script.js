let url = new XMLHttpRequest()
url.open('post', "https://dummyjson.com/auth/login")
url.setRequestHeader('Content-type', 'application/json')
url.onreadystatechange = () => {
	if (url.readyState == XMLHttpRequest.DONE) {
		let data = JSON.parse(url.responseText)
		window.location.href = "../htmlPages/second.html"
	}
}
function register() {
	let login = document.querySelector('.signup .login').value
	let password = document.querySelector('.signup .password').value

	if (login && password) {
		localStorage.setItem('login', login)
		localStorage.setItem('password', password)

		console.log('Registration successful!')
		document.querySelector('.login').value = ''
		document.querySelector('.password').value = ''
	}
	else {
		console.log('Please provide both login and password.')
	}


}

function login() {
	let login = document.querySelector('.signin .login').value
	let password = document.querySelector('.signin .password').value

	if (login === localStorage.getItem('login') && password === localStorage.getItem('password')) {
		console.log('Login successful!')
		url.send(JSON.stringify(
			{
				"login": login,
				"password": password
			}
		))
	}
	else {
		console.log(login, password)
		console.log('Invalid login or password.')
	}
}

