
document.addEventListener("DOMContentLoaded", () => {
    console.log("Tournaments Page Loaded");

    const tournamentList = document.getElementById("tournament-list");

    // ✅ Tournament Data (2021 - 2024)
    tournamentList.innerHTML = "";
    const tournaments = [
        {
            year: 2021,
            winner: "Acend",
            winnerLogo: "images/teams/acend.png",
            tournamentLogo: "images/VCT_Logo_2021.png",
            final: "Acend 🆚 Gambit Esports",
            bracket: [
                { round: "Grand Final", team1: "Acend", team2: "Gambit Esports", score: "3-2" },
                { round: "Lower Final", team1: "Gambit", team2: "KRU", score: "3-1" }
            ]
        },
        {
            year: 2022,
            winner: "LOUD",
            winnerLogo: "images/teams/loud.png",
            tournamentLogo: "images/VCT_Logo_2022.png",
            final: "LOUD 🆚 OpTic Gaming",
            bracket: [
                { round: "Grand Final", team1: "LOUD", team2: "OpTic Gaming", score: "3-1" },
                { round: "Lower Final", team1: "OpTic", team2: "DRX", score: "3-2" }
            ]
        },
        {
            year: 2023,
            winner: "Evil Geniuses",
            winnerLogo: "images/teams/eg.png",
            tournamentLogo: "images/tournaments/2023.png",
            final: "Evil Geniuses 🆚 Paper Rex",
            bracket: [
                { round: "Grand Final", team1: "Evil Geniuses", team2: "Paper Rex", score: "3-1" },
                { round: "Lower Final", team1: "Paper Rex", team2: "Fnatic", score: "3-2" }
            ]
        },
        {
            year: 2024,
            winner: "EDward Gaming",
            winnerLogo: "images/teams/edg.png",
            tournamentLogo: "images/tournaments/2024.png",
            final: "EDG 🆚 Team Heretics",
            bracket: [
                { round: "Grand Final", team1: "EDG", team2: "Team Heretics", score: "3-0" },
                { round: "Lower Final", team1: "Team Heretics", team2: "Sentinels", score: "3-1" }
            ]
        }
    ];
    

    //  Generate Tournament Cards
    tournaments.forEach(tournament => {
        const card = document.createElement("div");
        card.classList.add("tournament-card");
        card.innerHTML = `
            <h3>Valorant Champions ${tournament.year}</h3>
            <p><strong>Winner:</strong> 🏆 ${tournament.winner}</p>
        `;
        card.addEventListener("click", () => showBracket(tournament));
        tournamentList.appendChild(card);
    });
});

//  Show Tournament Bracket
function showBracket(tournament) {
    console.log("Opening bracket for:", tournament.year);

    const bracketContainer = document.getElementById("bracket-container");
    const bracketDetails = document.getElementById("bracket-details");

    if (!bracketContainer || !bracketDetails) {
        console.error("❌ Error: Bracket elements not found!");
        return;
    }

    //  Clear previous bracket details
    bracketDetails.innerHTML = `
        <h2>Valorant Champions ${tournament.year} Bracket</h2>
    `;

    //  Create a full bracket layout
    const bracketTree = document.createElement("div");
    bracketTree.classList.add("bracket-tree");

    tournament.bracket.forEach(match => {
        const matchBox = document.createElement("div");
        matchBox.classList.add("match-box");
        matchBox.innerHTML = `
            <strong>${match.round}</strong>
            <p>${match.team1} 🆚 ${match.team2}</p>
            <span class="score">(${match.score})</span>
        `;
        bracketTree.appendChild(matchBox);
    });

    bracketDetails.appendChild(bracketTree);
    bracketContainer.classList.remove("hidden");
}

function closeBracket() {
    const bracketContainer = document.getElementById("bracket-container");

    if (!bracketContainer) {
        console.error("❌ Error: Bracket container not found!");
        return;
    }

    console.log("Closing bracket..."); 

    //  Hide the modal
    bracketContainer.classList.add("hidden");
    bracketContainer.style.display = "none";
}
    // mobile menu toggle
    const TmenuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (TmenuToggle && navLinks) {
        TmenuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    } else {
        console.warn("Menu elements not found");
    }


tournaments.forEach(tournament => {
    const card = document.createElement("div");
    card.classList.add("tournament-card");
    card.innerHTML = `
        <img src="${tournament.tournamentLogo}" alt="${tournament.year} Logo" class="tournament-logo">
        <h3>Valorant Champions ${tournament.year}</h3>
        <p><strong>Winner:</strong> 🏆 ${tournament.winner}</p>
        <img src="${tournament.winnerLogo}" alt="${tournament.winner} Logo" class="winner-logo">
    `;
    card.addEventListener("click", () => showBracket(tournament));
    tournamentList.appendChild(card);
});
