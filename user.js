// Select the button and user container elements
const fetchUsersBtn = document.getElementById('fetchUsersBtn');
const userContainer = document.getElementById('userContainer');
// Function to fetch and display user data
function fetchAndDisplayUsers() {
 // Clear the container before fetching new data
 userContainer.innerHTML = '';
 // Fetch data from the JSONPlaceholder API
 fetch('https://jsonplaceholder.typicode.com/users')
 .then(response => response.json())
 .then(users => {
 // Loop through the user data and create elements to display it
 users.forEach(user => {
 const userCard = document.createElement('div');
 userCard.className = 'user-card';

 userCard.innerHTML = `
 <h3>${user.name}</h3>
 <p>Email: ${user.email}</p>
 <p>Phone: ${user.phone}</p>
 <p>Website: ${user.website}</p>
 <p>Company: ${user.company.name}</p>
 `;

 userContainer.appendChild(userCard);
 });
 })
    .catch(error => {
        console.error('Error fetching user data:', error);
        userContainer.innerHTML = '<p style="color:red;">Failed to fetch user data. Please try
again later.</p>';
    });
}
// Attach the click event to the button
fetchUsersBtn.addEventListener('click', fetchAndDisplayUsers);