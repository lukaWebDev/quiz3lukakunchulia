document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://jsonplaceholder.typicode.com/users";
  const userContainer = document.getElementById("user-list");
  const searchInput = document.getElementById("search");

  let users = [];

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      users = await response.json();
      renderUsers(users);
    } catch (error) {
      userContainer.innerHTML = "<p>Error loading users.</p>";
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const renderUsers = (usersToRender) => {
    userContainer.innerHTML = "";

    usersToRender.forEach((user) => {
      const card = document.createElement("div");
      card.className = "user-card";

      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.textContent = getInitials(user.name);

      const name = document.createElement("h3");
      name.textContent = user.name;

      const email = document.createElement("p");
      email.textContent = user.email;

      const address = document.createElement("p");
      const { street, suite, city } = user.address;
      address.textContent = `${street}, ${suite}, ${city}`;

      card.appendChild(avatar);
      card.appendChild(name);
      card.appendChild(email);
      card.appendChild(address);

      userContainer.appendChild(card);
    });
  };

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    );
    renderUsers(filteredUsers);
  });

  fetchUsers();
});
