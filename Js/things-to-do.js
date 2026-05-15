const ttdSubjectCardsContainer = document.getElementById("ttdSubjectCardsContainer");

async function loadSubjectCards() {
    if (!ttdSubjectCardsContainer) {
        console.error("Could not find #ttdSubjectCardsContainer in the HTML.");
        return;
    }

    try {
        const response = await fetch("../Res/Data/ttd-subject-cards.json");

        if (!response.ok) {
            throw new Error("JSON file not found. Status: " + response.status);
        }

        const cards = await response.json();

        createSubjectCards(cards);

    } catch (error) {
        console.error("Subject card loading error:", error);

        ttdSubjectCardsContainer.innerHTML = `
            <p class="error_message">
                Could not load subject cards.<br>
                ${error.message}
            </p>
        `;
    }
}

function createSubjectCards(cards) {
    ttdSubjectCardsContainer.innerHTML = "";

    cards.forEach(function(card) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("ttd_subject_card");

        cardElement.style.backgroundImage = `
            linear-gradient(rgba(0, 40, 85, 0.55), rgba(0, 40, 85, 0.78)),
            url("${card.image}")
        `;

        cardElement.innerHTML = `
            <div class="ttd_subject_card_content">
                <h2>${card.title}</h2>
                <p>${card.description}</p>
                <a href="${card.link}" class="ttd_subject_btn">${card.buttonText}</a>
            </div>
        `;

        ttdSubjectCardsContainer.appendChild(cardElement);
    });
}

loadSubjectCards();