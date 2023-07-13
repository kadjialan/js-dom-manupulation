const users = [
  { name: 'Kadji Danel', age: 18 },
  { name: 'Alan James', age: 41 },
  { name: 'Gaetan Vianey', age: 30 },
  { name: 'Charles Evans', age: 55 },
  { name: 'Bitz Boy', age: 50 },
  { name: 'Rash Junior', age: 56 },
  { name: 'Joshua Joshi', age: 47 },
  { name: 'Emmanual Atangana', age: 48 },
  { name: 'Alaric Kevin', age: 60 },
  { name: 'Christ Godden', age: 50 },
  { name: 'Nathaneal Mesmer', age: 24 },
  { name: 'Ange Joelle', age: 29 },
  { name: 'Nehal Gringo', age: 53 },
  { name: 'Nicole Mekongo', age: 43 },
  { name: 'Jessica Keyoma', age: 32 },
  { name: 'John Paul', age: 20 },
  { name: 'Jones Adam', age: 17 },
  { name: 'Johnny Alide', age: 34 },
  { name: 'Pryan Patrick', age: 26 },
  { name: 'Cathy Ntoulo', age: 59 },
  { name: 'Paul Bamock', age: 15 }
]

const form = document.querySelector('form')

// Function to filter users by name or age
function filterUsers (name, age) {
  const filteredUsers = users.filter((user) => {
    if (age) {
      return user.age === age
    }
    if (name !== '') {
      return (
        user.name.toLowerCase() === name ||
        user.name.toLowerCase().includes(name)
      )
    }

    if (age && name !== '') {
      return user.age === age && user.name.toLowerCase() === name
    }
    return false
  })

  return filteredUsers
}

// Function to display filtered users
function displayUsers (filteredUsers) {
  console.log(filteredUsers)
  const resultsContainer = document.getElementById('all-users')
  resultsContainer.innerHTML = ''

  if (filteredUsers.length === 0) {
    resultsContainer.innerHTML = "<p class='error'>No user found.</p>"
    return
  }

  function getInitial (name) {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('.')
  }

  filteredUsers.forEach((user) => {
    const userDiv = document.createElement('div')
    userDiv.classList.add('user')

    userDiv.innerHTML = ` 
    <div class="details"> 
    <h2 class="acronyms">${getInitial(user.name)}</h2>
    <h3 class="fullname">Name: ${user.name}</h3>
       <p class="numb">Age: ${user.age}</p>
    <button class="delete-btn">&cross;</button>
    </div>
`

    const deleteBtn = userDiv.querySelector('.delete-btn')
    deleteBtn.addEventListener('click', () => {
      deleteUser(user)
    })

    resultsContainer.appendChild(userDiv)
  })
}

displayUsers(users)

// Function to delete a user
function deleteUser (user) {
  console.log(user.name)
  const newArray = users.filter((element) => user.name !== element.name)
  console.log(newArray)
  displayUsers(newArray)
}

// Function to handle search button click
function handleSearch (nameInput, ageInput) {
  const name = nameInput.trim().toLowerCase()
  const age = ageInput
  console.log(nameInput.value, age.valueOf())

  const filteredUsers = filterUsers(name, age)
  displayUsers(filteredUsers)
}

// Function to show loader while searching users
function showLoader () {
  const loader = document.getElementById('loader')
  loader.classList.remove('hidden')
}

// Function to hide loader
function hideLoader () {
  const loader = document.getElementById('loader')
  loader.classList.add('hidden')
}

// Event listener for  form

form.addEventListener('submit', (e) => {
  e.preventDefault()
  showLoader()

  setTimeout(() => {
    handleSearch(e.target.name.value, +e.target.age.value)
    hideLoader()
  }, 1000)
})
