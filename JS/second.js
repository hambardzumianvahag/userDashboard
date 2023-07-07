let logOut = document.querySelector('.logout')
logOut.addEventListener('click', () => {
	window.location.href = "index.html"
})

let currentPage = 1;
let itemsPerPage = 5;

function fetchDataAndPrint(url) {
	fetch(url)
		.then(response => response.json())
		.then(data => {
			let tableSection = document.querySelector('.table_section');
			tableSection.innerHTML = '';
			let startIndex = (currentPage - 1) * itemsPerPage;
			let endIndex = startIndex + itemsPerPage;
			let currentData = data.users.slice(startIndex, endIndex);

			let table = document.createElement('table');
			let thead = document.createElement('thead');
			let headerRow = document.createElement('tr');
			let headerFields = ['Id', 'First Name', 'Last Name', 'Email', 'Age', 'Action'];
			headerFields.forEach(headerText => {
				let th = document.createElement('th');
				th.textContent = headerText;
				headerRow.appendChild(th);
			});
			thead.appendChild(headerRow);
			table.appendChild(thead);
			let tbody = document.createElement('tbody');
			currentData.forEach(user => {
				let row = document.createElement('tr');
				let { id, firstName, lastName, email, age } = user;

				let idCell = document.createElement('td');
				idCell.textContent = id;
				row.appendChild(idCell);

				let firstNameCell = document.createElement('td');
				firstNameCell.textContent = firstName;
				row.appendChild(firstNameCell);

				let lastNameCell = document.createElement('td');
				lastNameCell.textContent = lastName;
				row.appendChild(lastNameCell);

				let emailCell = document.createElement('td');
				emailCell.textContent = email;
				row.appendChild(emailCell);

				let ageCell = document.createElement('td');
				ageCell.textContent = age;
				row.appendChild(ageCell);

				let edit = document.createElement('td');
				edit.innerHTML = `<button class='edit'>Open</button>`;
				row.appendChild(edit);
				tbody.appendChild(row);
			});
			table.appendChild(tbody);
			tableSection.appendChild(table);
			createPaginationButtons(data.users.length);
			let edit = document.querySelectorAll('.edit')
			edit.forEach(e => {
				e.addEventListener('click', (e) => {
					let num = e.target.parentElement.parentElement.firstElementChild.innerHTML;
					fetch(`https://dummyjson.com/users/${num}`)
						.then(r => r.json())
						.then(r => openModal(r));
				});
			});
		})
		.catch(error => console.error(error));
}

function createPaginationButtons(totalItems) {
	let totalPages = Math.ceil(totalItems / itemsPerPage);
	let paginationContainer = document.querySelector('.pagination');
	paginationContainer.innerHTML = '';

	for (let i = 1; i <= totalPages; i++) {
		let button = document.createElement('button');
		button.textContent = i;
		button.classList.add('page-link');
		if (i === currentPage) {
			button.classList.add('active');
		}
		button.addEventListener('click', () => {
			currentPage = i;
			// !
			if (document.querySelector('.input').value == '') {
				fetchDataAndPrint('https://dummyjson.com/users');
			}
			else {
				fetchDataAndPrint(`https://dummyjson.com/users/search?q=${document.querySelector('.input').value}`);
			}
			//!
			updatePaginationButtons();
		});
		paginationContainer.appendChild(button);
	}
}

function updatePaginationButtons() {
	let buttons = document.querySelectorAll('.page-link');
	buttons.forEach(button => {
		let pageNumber = parseInt(button.textContent);
		if (pageNumber === currentPage) {
			button.classList.add('active');
		}
		else {
			button.classList.remove('active');
		}
	});
}

function openModal(userData) {
	let modal = document.getElementById('modal');
	modal.innerHTML = `
		<div class="modal-content">
			<span class="close">&times;</span>
			<h2 style='text-align: center'>User N°${userData.id}</h2>
			<image src=${userData.image} class='user_photo' />
			<p><strong>First Name:</strong> ${userData.firstName}</p>
			<p><strong>Last Name:</strong> ${userData.lastName}</p>
			<p><strong>Username:</strong> ${userData.username}</p>
			<p><strong>City:</strong> ${userData.address.city}</p>
			<p><strong>Email:</strong> ${userData.email}</p>
			<p><strong>Phone:</strong> ${userData.phone}</p>
			<p><strong>Age:</strong> ${userData.age}</p>
		</div>
	`;
	let closeBtn = modal.querySelector('.close');
	closeBtn.addEventListener('click', () => {
		modal.style.display = 'none';
	});
	window.addEventListener('click', (event) => {
		if (event.target === modal) {
			modal.style.display = 'none';
		}
	});
	modal.style.display = 'block';
}

fetchDataAndPrint('https://dummyjson.com/users');

let input = document.querySelector('.input')
input.addEventListener('input', (e) => {
	fetchDataAndPrint(`https://dummyjson.com/users/search?q=${e.target.value}`);
})


let profile = document.querySelectorAll('.profile')
profile.forEach(elem => {
	elem.addEventListener('click', () => {
		let modal = document.getElementById('modal');
		// !
		modal.innerHTML = `
		<div class="modal-content">
			<span class="close">&times;</span>
			<h2 style='text-align: center'>User Profile</h2>
			<p><strong>Email:</strong> ${localStorage.getItem('login')}</p>
		</div>
	`;
		// !
		let closeBtn = modal.querySelector('.close');
		closeBtn.addEventListener('click', () => {
			modal.style.display = 'none';
		});
		window.addEventListener('click', (event) => {
			if (event.target === modal) {
				modal.style.display = 'none';
			}
		});
		modal.style.display = 'block';
	})
})

let mainSection = document.querySelector('.main')
let gameBtn = document.querySelector('.game')
let tableBtn = document.querySelector('.active-btn')
gameBtn.addEventListener('click', () => {
	gameBtn.classList.add('active-btn')
	gameBtn.classList.remove('option')
	tableBtn.classList.add('option')
	tableBtn.classList.remove('active-btn')

	mainSection.innerHTML = `
	<div class='game-container'>
	<h1 class='game-name'>Game vs Computer</h1>
	<p class='game-desc'>the rules of the game are as follows: the computer stores a number between 0-20, you have to guess that number by typing in the input. If you guess correctly, you get 1 point. If you guess wrong, the computer scores a point</p>
	<div class='game-points'>
	<div>
	<h1>My Points</h1>
	<h1 class='my-point'>0</h1>
	</div>
	<div>
	<h1>Computer Points</h1>
	<h1 class='computer-point'>0</h1>
	</div>
	</div>
	<hr>
	<input type='text' placeholder='Enter Number' class='game-input' /> <br>
	<button class='game-btn'>Check</button>
	<hr>
	<div class='game-numbers'>
		<div>
		<h1>My Number</h1>
		<h1 class='my-number'></h1>
		</div>
		<div>
		<h1>Computer Number</h1>
		<h1 class='computer-number'></h1>
		</div>
	</div>
	<div>
			<h1 class='result'>aaa</h1>
		</div>
	`
	let result = mainSection.querySelector('.result')

	let myPoint = mainSection.querySelector('.my-point')
	let compPoint = mainSection.querySelector('.computer-point')
	let compNumber = mainSection.querySelector('.computer-number')
	let myNumber = mainSection.querySelector('.my-number')
	let checkBtn = mainSection.querySelector('.game-btn')
	let gameInp = mainSection.querySelector('.game-input')

	checkBtn.addEventListener('click', () => {
		myNumber.innerHTML = gameInp.value
		compNumber.innerHTML = Math.round(Math.random() * 20)

		if (myNumber.innerHTML == compNumber.innerHTML) {
			myPoint.innerHTML++
			result.innerHTML = 'You Won!'

		}
		else if (myNumber.innerHTML == '') {
			result.innerHTML = 'Please Enter a Number'
		}
		else {
			compPoint.innerHTML++
			result.innerHTML = 'You Lost!'
		}
	})
})

tableBtn.addEventListener('click', () => {
	gameBtn.classList.remove('active-btn')
	gameBtn.classList.add('option')
	tableBtn.classList.add('active-btn')
	tableBtn.classList.remove('option')
	window.location.href = './second.html'
})	
