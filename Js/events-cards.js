const eventCardsContainer = document.getElementById("eventCardsContainer");

async function loadEventCards() {
    try {
        const response = await fetch("/Res/Data/eventsCards.json");

        if (!response.ok) {
            throw new Error("Could not load eventCards JSON file.");
        }

        const eventCards = await response.json();

        createEventCards(eventCards);

    } catch (error) {

        console.error("eventCards loading error:", error);

        eventCardsContainer.innerHTML = `
            <p class="error_message">Could not load events.</p>
        `;
    }
}

function createEventCards(eventCards) {
    eventCardsContainer.innerHTML = "";

    eventCards.forEach(event => {

        const card = document.createElement("div");
        card.classList.add("events_card");

        card.innerHTML = `
            <div class="events_top">
                <div class="events_text">
                    <h1 id="${event.link}">
                        ${event.title}
                    </h1>
                    <p>${event.description}</p>
                    <button class="toggle">
                        More Info
                    </button>
                </div>

                <div class="events_main_img">
                    <img src="${event.mainImage}" alt="${event.mainImageAlt}">
                </div>
            </div>

            <div class="events_drop_down">
                ${createPlaces(event.places)}
            </div>
        `;
        eventCardsContainer.appendChild(card);

    });

    setupEventButtons();
}

function createPlaces(places) {

    return places.map(place => {

        return `
            <div class="place_card">
                <img src="${place.image}" alt="${place.alt}">
                <div class="place_text">
                    <h3>${place.name}</h3>
                    <p>${place.description}</p>
                </div>
            </div>
        `;
    }).join("");
}

function setupEventButtons() {

    const toggles = document.querySelectorAll(".toggle");

    toggles.forEach(toggle => {

        toggle.addEventListener("click", e => {

            const card = e.target.closest(".events_card");

            if (card) {

                card.classList.toggle("active");

                if (card.classList.contains("active")) {

                    toggle.textContent = "Show Less";

                } else {

                    toggle.textContent = "More Info";

                }
            }
        });
    });
}

loadEventCards();