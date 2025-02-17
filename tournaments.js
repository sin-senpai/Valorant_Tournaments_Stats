document.addEventListener("DOMContentLoaded", () => {
    const tournaments = [
        {
            year: 2021,
            winner: "Acend",
            logo: "images/vct-2021.png",
            bracket: "images/vct-2021-bracket.png",
            info: "Acend won the first-ever Valorant Champions tournament, defeating Gambit Esports 3-2."
        },
        {
            year: 2022,
            winner: "LOUD",
            logo: "images/vct-2022.png",
            bracket: "images/vct-2022-bracket.png",
            info: "LOUD defeated OpTic Gaming 3-1 to win the 2022 Valorant Champions title."
        },
        {
            year: 2023,
            winner: "Evil Geniuses",
            logo: "images/vct-2023.png",
            bracket: "images/vct-2023-bracket.png",
            info: "Evil Geniuses defeated Paper Rex 3-1 to become the 2023 Valorant Champions."
        },
        {
            year: 2024,
            winner: "EDward Gaming",
            logo: "images/vct-2024.png",
            bracket: "images/vct-2024-bracket.png",
            info: "EDward Gaming won the 2024 Valorant Champions, defeating Team Heretics in the finals."
        }
    ];

    const tournamentList = document.getElementById("tournament-list");
    const detailsPopup = document.getElementById("tournament-details");

    tournaments.forEach(tournament => {
        const card = document.createElement("div");
        card.classList.add("tournament-card");
        card.innerHTML = `
            <img src="${tournament.logo}" alt="${tournament.year} Logo">
            <h3>${tournament.year}</h3>
            <p>Winner: ${tournament.winner}</p>
        `;

        card.addEventListener("click", () => showDetails(tournament));
        tournamentList.appendChild(card);
    });

    function showDetails(tournament) {
        document.getElementById("tournament-year").textContent = `Valorant Champions ${tournament.year}`;
        document.getElementById("bracket-image").src = tournament.bracket;
        document.getElementById("tournament-info").textContent = tournament.info;
        detailsPopup.style.display = "block";
    }

    window.closeDetails = function () {
        detailsPopup.style.display = "none";
    };
});
