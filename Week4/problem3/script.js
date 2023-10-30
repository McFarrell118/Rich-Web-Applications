const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', fetchUserData);

async function fetchUserData() {
    const username = document.getElementById('username').value;

    try {
        // Fetch user profile information
        let response = await fetch(`https://api.github.com/users/${username}`);
        let data = await response.json();
        document.getElementById('profile-img').src = data.avatar_url;
        document.getElementById('name').textContent = data.name;
        document.getElementById('user').textContent = data.login;
        document.getElementById('email').textContent = data.email;
        document.getElementById('location').textContent = data.location;
        document.getElementById('gists').textContent = data.public_gists;

        // Fetch user repositories
        response = await fetch(data.repos_url);
        data = await response.json();
        const reposContainer = document.getElementById('repos');
        reposContainer.innerHTML = ''; // clear previous repos
        data.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.innerHTML = `
                <strong>${repo.name}</strong>
                <p>${repo.description}</p>
            `;
            reposContainer.appendChild(repoDiv);
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}
