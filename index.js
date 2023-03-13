//Це стандартний AJAX-код з використанням асинхронних функцій
const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".user-list");

//додали  слухача на подію по кліку на кнопку, під час якої виконується запит, і обробили можливу помилку конструкцією try...catch.
fetchUsersBtn.addEventListener("click", async () => {
  try {
    const users = await fetchUsers();
    renderUserListItems(users);
  } catch (error) {
    console.log(error.message);
  }
});

async function fetchUsers() {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  const userIds = [1, 2, 3, 4, 5];

  const arrayOfPromises = userIds.map(async (userId) => {
    const response = await fetch(`${baseUrl}/users/${userId}`);
    return response.json();
  });

  const users = await Promise.all(arrayOfPromises);
  return users;
}

function renderUserListItems(users) {
  const markup = users
    .map(
      (user) => `<li class="item">
  <p><b>Name</b>: ${user.name}</p>
  <p><b>Email</b>: ${user.email}</p>
  <p><b>Company</b>: ${user.company.name}</p>
  </li>`
    )
    .join("");
  userList.innerHTML = markup;
}
