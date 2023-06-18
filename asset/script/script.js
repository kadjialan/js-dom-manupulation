const form = document.querySelector('form');
const userContainer = document.querySelector('.all-users');

function displayUser({ age, name }) {
    return `<div class="user">
    <div class="details">
        <h2>${name}</h2>
        <p>${age} years${age > 1 ? "s" : ""} old</p>
    </div>
</div>`

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
                reject([]);
            }

        },3000);
    });
}

function renderMessage(message) {
    return `<div class="message">${message}</div>`
}

userContainer.innerHTML = displayUsers(users);




form.addEventListener("submit", (e) => {
    e.preventDefault();
    userContainer.innerHTML = renderMessage("Searching users....");
    searchUsers(e.target.name.value, +e.target.age.value)
        .then((result) => {
            userContainer.innerHTML = displayUsers((result));
        })
        .catch((e) => {
            userContainer.innerHTML = renderMessage(
                "Error loading users! please try again"
            );
        });
});