const sportsAttractionsContainer = document.getElementById("sportsAttractionsContainer");

async function loadSportsAttractions() {
    if (!sportsAttractionsContainer) {
        console.error("Could not find #sportsAttractionsContainer in the HTML.");
        return;
    }

    try {
        const response = await fetch("/Res/Data/sports-attractions.json");

        if (!response.ok) {
            throw new Error("Could not load sports attractions JSON file. Status: " + response.status);
        }

        const attractions = await response.json();

        createSportsAttractionCards(attractions);

    } catch (error) {
        console.error("Sports attractions loading error:", error);

        sportsAttractionsContainer.innerHTML = `
            <p class="error_message">
                Could not load sports attractions.<br>
                ${error.message}
            </p>
        `;
    }
}

function createSportsAttractionCards(attractions) {
    sportsAttractionsContainer.innerHTML = "";

    attractions.forEach(function(attraction) {
        const card = document.createElement("div");

        card.classList.add("sports_attractions_card");

        card.innerHTML = `
            <div class="sports_attractions_top">

                <div class="sports_attractions_text">
                    <h1 id="${attraction.id}">${attraction.title}</h1>

                    <p>${attraction.description}</p>

                    <button class="toggle" type="button">More Info</button>
                </div>

                <div class="sports_attractions_main_img">
                    <img src="${attraction.mainImage}" alt="${attraction.mainImageAlt}">
                </div>

            </div>

            <div class="sports_attractions_drop_down">
                ${createSportsPlaces(attraction.places)}
            </div>
        `;

        sportsAttractionsContainer.appendChild(card);
    });

    setupSportsAttractionButtons();
}

function createSportsPlaces(places) {
    return places.map(function(place) {
        return `
            <div class="sports_place_card">
                <img src="${place.image}" alt="${place.alt}">

                <div class="sports_place_text">
                    <h3>${place.name}</h3>
                    <p>${place.description}</p>
                </div>
            </div>
        `;
    }).join("");
}

function setupSportsAttractionButtons() {
    const toggles = document.querySelectorAll(".toggle");

    toggles.forEach(function(toggle) {
        toggle.addEventListener("click", function(event) {
            const card = event.target.closest(".sports_attractions_card");

            if (!card) {
                return;
            }

            card.classList.toggle("active");

            if (card.classList.contains("active")) {
                toggle.textContent = "Show Less";
            } else {
                toggle.textContent = "More Info";
            }
        });
    });
}

loadSportsAttractions();