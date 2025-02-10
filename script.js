document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const video = document.querySelector(".hero-video video");
    if (video) {
        video.addEventListener("mouseenter", () => {
            video.play();  // Play the video when hovered
            video.muted = false;
            video.volume = 0.1;
        });

        video.addEventListener("mouseleave", () => {
            video.pause();  // Pause the video when mouse leaves
            video.muted = true;
        });
    } else {
        console.warn("Video element not found");
    }

    const playersGrid = document.getElementById("players-grid");
    if (!playersGrid) {
        console.error("Element with ID 'players-grid' not found.");
        return;
    }
    console.log("players-grid element found:", playersGrid);

    // players section
    fetch("https://vlr.orlandomm.net/api/v1/players?event_id=2097&limit=20")
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

                // Fallbacks for missing data
                const username = player.user || "Unknown"; 
                const profileImage = player.img || 'images/default-player.png'; 

                const playerCard = document.createElement("div");
                playerCard.classList.add("player-card");
                playerCard.innerHTML = `
                    <img src="${profileImage}" alt="${player.name} Profile">
                    <h3>${player.name}</h3>
                    <p>Username: ${username}</p>
                    <p>Country: ${player.country ? player.country.toUpperCase() : 'Unknown'}</p>
                    <button class="view-more" onclick="showPlayerDetails('${player.url}')">View More</button>
                `;
                playersGrid.appendChild(playerCard);
            });
        })
        .catch(error => console.error("Error fetching players:", error));
});

function showPlayerDetails(playerUrl) {
    window.open(playerUrl, "_blank");
}

