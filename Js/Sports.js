const sportsSubjectCardsContainer = document.getElementById("sportsSubjectCardsContainer");

async function loadSportsSubjectCards() {
    if (!sportsSubjectCardsContainer) {
        console.error("Could not find #sportsSubjectCardsContainer in the HTML.");
        return;
    }

    try {
        const response = await fetch("../Res/Data/sports-subject-cards.json");

        if (!response.ok) {
            throw new Error("JSON file not found. Status: " + response.status);
        }

        const cards = await response.json();

        createSportsSubjectCards(cards);

    } catch (error) {
        console.error("Sports subject card loading error:", error);

        sportsSubjectCardsContainer.innerHTML = `
            <p class="error_message">
                Could not load sports cards.<br>
                ${error.message}
            </p>
        `;
    }
}

function createSportsSubjectCards(cards) {
    sportsSubjectCardsContainer.innerHTML = "";

    cards.forEach(function(card) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("sports_subject_card");

        cardElement.style.backgroundImage = `
            linear-gradient(rgba(0, 40, 85, 0.55), rgba(0, 40, 85, 0.78)),
            url("${card.image}")
        `;

        cardElement.innerHTML = `
            <div class="sports_subject_card_content">
                <h2>${card.title}</h2>
                <p>${card.description}</p>
                <a href="sports.html${card.link}" class="sports_subject_btn">${card.buttonText}</a>
            </div>
        `;

        sportsSubjectCardsContainer.appendChild(cardElement);
    });
}

loadSportsSubjectCards();