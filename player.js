document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get("id");

    if (!playerId) {
        document.getElementById("player-info").innerHTML = "<p>No player selected.</p>";
        return;
    }

    const apiUrl = `https://vlr.orlandomm.net/api/v1/players/${playerId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (!data || !data.data) {
                document.getElementById("player-info").innerHTML = "<p>Player not found.</p>";
                return;
            }

            const player = data.data;
            const playerInfo = player.info;
            const team = player.team || {};
            const pastTeams = player.pastTeams || [];
            const results = player.results || [];
            const socials = player.socials || {};
            const countryCode = playerInfo.country ? playerInfo.country.toLowerCase() : null;
            const countryFlag = countryCode ? `https://flagcdn.com/w40/${countryCode}.png` : 'images/default-flag.png';
            const teamLogo = team.logo || "images/default-team.png";

            let htmlContent = `
                <div class="player-card">
                    <img src="${playerInfo.img || 'images/default-player.png'}" alt="${playerInfo.name}">
                    <h2>${playerInfo.name} (${playerInfo.user || "Unknown"})</h2>
                    <p>
                        <img src="${countryFlag}" alt="${playerInfo.country}" class="flag">
                        ${playerInfo.country}
                    </p>
                    <p><strong>Current Team:</strong> ${team.name || "Free Agent"}</p>
                    <img src="${teamLogo}" alt="${team.name}" class="team-logo">
                    <p>Joined: ${team.joined || "N/A"}</p>
                </div>
            `;

            let extraInfoContent = `<div class="extra-info">`;

            if (pastTeams.length > 0) {
                extraInfoContent += "<h3>Past Teams</h3><ul class='past-teams'>";
                pastTeams.forEach(team => {
                    extraInfoContent += `
                        <li>
                            <img src="${team.logo || 'images/default-team.png'}" alt="${team.name}" class="team-logo">
                            <a href="https://vlr.gg/${team.id}" target="_blank">${team.name}</a>
                        </li>
                    `;
                });
                
                extraInfoContent += "</ul>";
            }

            if (results.length > 0) {
                extraInfoContent += "<h3>Recent Matches</h3><ul class='recent-matches'>";
                results.forEach(match => {
                    extraInfoContent += `
                        <li>
                            <img src="${match.event.logo || 'images/default-event.png'}" alt="${match.event.name}" class="event-logo">
                            <a href="${match.match.url}" target="_blank">${match.event.name}</a>
                        </li>
                    `;
                });
                extraInfoContent += "</ul>";
            }

            extraInfoContent += "</div>"; 

            htmlContent += extraInfoContent;

            htmlContent += "<div class='social-media'>";
            htmlContent += "<h3>Social Media</h3>";
            htmlContent += "<div class='social-links'>";
            if (socials.twitter_url) {
                htmlContent += `<a href="${socials.twitter_url}" target="_blank"><i class='bx bxl-twitter'></i></a>`;
            }
            if (socials.twitch_url) {
                htmlContent += `<a href="${socials.twitch_url}" target="_blank"><i class='bx bxl-twitch'></i></a>`;
            }
           htmlContent += "</div></div>";
            

            document.getElementById("player-info").innerHTML = htmlContent;
        })
        .catch(error => {
            console.error("Error fetching player data:", error);
            document.getElementById("player-info").innerHTML = "<p>Error loading player details.</p>";
        });
});


