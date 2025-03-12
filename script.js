document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const video = document.querySelector(".hero-video video");
    if (video) {
        video.addEventListener("mouseenter", () => {
            video.play();
            video.muted = false;
            video.volume = 0.1;
        });

        video.addEventListener("mouseleave", () => {
            video.pause();
            video.muted = true;
        });
    } else {
        console.warn("Video element not found");
    }

    // mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    } else {
        console.warn("Menu elements not found");
    }

    // fetch Players Data
    const playersGrid = document.getElementById("players-grid");
    if (!playersGrid) {
        console.error("Element with ID 'players-grid' not found.");
        return;
    }
    console.log("players-grid element found:", playersGrid);

    fetch("https://vlr.orlandomm.net/api/v1/players?event=2097&timespan=all&limit=all")
        .then(response => {
            console.log("Fetch response:", response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response Data:", data);
            playersGrid.innerHTML = "";

            data.data.forEach(player => {
                console.log("Player Data:", player);

                // fallbacks for missing data
                const teamName = player.teamTag ? player.teamTag : "Free Agent";
                const profileImage = player.img || "images/default-player.png";
                const countryCode = player.country ? player.country.toLowerCase() : null;
                const countryFlag = countryCode ? `https://flagcdn.com/w40/${countryCode}.png` : "images/default-flag.png";

                const playerCard = document.createElement("div");
                playerCard.classList.add("player-card");
                playerCard.innerHTML = `
                    <img src="${profileImage}" alt="${player.name} Profile">
                    <h3>${player.name}</h3>
                    <p>Team: ${teamName}</p>
                    <p><img src="${countryFlag}" alt="${player.country}" class="flag"></p>
                    <button class="view-more" onclick="showPlayerDetails('${player.id}')">View More</button>
                `;
                playersGrid.appendChild(playerCard);
            });
        })
        .catch(error => console.error("Error fetching players:", error));
});

function showPlayerDetails(playerId) {
    window.location.href = `player.html?id=${playerId}`;
}