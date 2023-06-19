const users = [
  { name: "Kadji Danel", age: 18 },
  { name: "Alan James", age: 41 },
  { name: "Gaetan Vianey", age: 30 },
  { name: "Charles Evans", age: 55 },
  { name: "Bitz Boy", age: 50 },
  { name: "Rash Junior", age: 56 },
  { name: "Joshua Joshi", age: 47 },
  { name: "Emmanual Atangana", age: 48 },
  { name: "Alaric Kevin", age: 60 },
  { name: "Christ Godden", age: 50 },
  { name: "Nathaneal Mesmer", age: 24 },
  { name: "Ange Joelle", age: 29 },
  { name: "Nehal Gringo", age: 53 },
  { name: "Nicole Mekongo", age: 43 },
  { name: "Jessica Keyoma", age: 32 },
  { name: "John Paul", age: 20 },
  { name: "Jones Adam", age: 17 },
  { name: "Johnny Alide", age: 34 },
  { name: "Pryan Patrick", age: 26 },
  { name: "Cathy Ntoulo", age: 59 },
  { name: "Paul Bamock", age: 15 },
];

const form = document.querySelector("form");
const userContainer = document.querySelector(".all-users");

function getInitial(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join(".");
}

function displayUser({ age, name }) {
  return `<div class="user">
    <div class="details">
        <h2>${getInitial(name)}</h2>
        <h3>${name}</h3>
        <p>${age} years${age > 1 ? "s" : ""} old</p>
        <button>&cross;</button>
    </div>
  
</div>`;
}

function displayUsers(persons) {
  return persons.length
    ? persons.map(displayUser).join("")
    : renderMessage("Sorry! No user found");
}

function compareNames(name, searchTerm) {
  return name.toLowerCase().includes(searchTerm.toLowerCase());
}

function shouldResolve() {
  return Math.random() < 0.85;
}

function searchUsers(name, age) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve()) {
        resolve(
          users.filter(
            (user) =>
              (!name || compareNames(user.name, name)) &&
              (!age || user.age === age)
          )
        );
      } else {
        reject(new Error("something bad happened"));
      }
    }, 3000);
  });
}

function renderMessage(message) {
  return `<div class="message">${message}</div>`;
}
userContainer.innerHTML = displayUsers(users);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  userContainer.innerHTML = renderMessage("Searching users....");
  searchUsers(e.target.name.value, +e.target.age.value)
    .then((result) => {
      userContainer.innerHTML = displayUsers(result);
    })
    .catch((e) => {
      userContainer.innerHTML = renderMessage(
        "Error loading users! please try again"
      );
    });
});
