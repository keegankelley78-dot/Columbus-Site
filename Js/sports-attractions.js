const sportsAttractionsContainer = document.getElementById("sportsAttractionsContainer");

async function loadSportsAttractions() {
    try {
        const response = await fetch("/Res/Data/sports-attractions.json");

        if (!response.ok) {
            throw new Error("Could not load sports attractions JSON file.");
        }

        const attractions = await response.json();
        createSportsAttractionCards(attractions);

    } 
    catch (error) {
        console.error("Sports attractions loading error:", error);

        sportsAttractionsContainer.innerHTML = `
            <p class="error_message">Could not load sports attractions.</p>
        `;
    }
}

function createSportsAttractionCards(attractions) {
    sportsAttractionsContainer.innerHTML = "";

    attractions.forEach(attraction => {

        const card = document.createElement("div");
        card.classList.add("sports_attractions_card");

        card.innerHTML = `
            <div class="sports_attractions_top">

                <div class="sports_attractions_text">

                    <h1 id="${attraction.link}">${attraction.title}</h1>

                    <p>${attraction.description}</p>

                    <button class="toggle">More Info</button>

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
    return places.map(place => {
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

    toggles.forEach(toggle => {
        toggle.addEventListener("click", e => {

            const card = e.target.closest(".sports_attractions_card");

            if (card) {
                card.classList.toggle("active");

                toggle.textContent = card.classList.contains("active")
                    ? "Show Less"
                    : "More Info";
            }

        });
    });
}

loadSportsAttractions();