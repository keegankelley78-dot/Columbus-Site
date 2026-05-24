const restaurantCards = document.getElementById("restaurantCards");
const filterButtons = document.querySelectorAll(".filter_btn");

let allPlaces = [];

async function loadRestaurants() {
    restaurantCards.innerHTML = `<p>Loading restaurants...</p>`;

    const query = `
        [out:json][timeout:25];
        area["name"="Columbus"]["boundary"="administrative"]->.searchArea;
        (
            node["amenity"="restaurant"](area.searchArea);
            node["amenity"="cafe"](area.searchArea);
            node["amenity"="fast_food"](area.searchArea);
        );
        out body;
    `;

    const apiURL = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);

    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("API request failed.");
        }

        const data = await response.json();

        allPlaces = data.elements.filter(function(place) {
            return place.tags && place.tags.name;
        });

        createRestaurantCards(allPlaces.slice(0, 12));

    } catch (error) {
        console.error("API error:", error);

        restaurantCards.innerHTML = `
            <p class="error_message">Could not load restaurant data.</p>
        `;
    }
}

function createRestaurantCards(places) {
    restaurantCards.innerHTML = "";

    if (places.length === 0) {
        restaurantCards.innerHTML = `<p>No places found.</p>`;
        return;
    }

    places.forEach(function(place) {
        const tags = place.tags;

        const name = tags.name || "Unknown Restaurant";
        const type = tags.amenity || "restaurant";
        const cuisine = tags.cuisine || "Food";
        const street = tags["addr:street"] || "Address not listed";
        const houseNumber = tags["addr:housenumber"] || "";

        const card = document.createElement("div");
        card.classList.add("restaurant_card");

        card.innerHTML = `
            <div class="restaurant_card_content">
                <h3>${name}</h3>
                <p><strong>Type:</strong> ${formatText(type)}</p>
                <p><strong>Cuisine:</strong> ${formatText(cuisine)}</p>
                <p><strong>Address:</strong> ${houseNumber} ${street}</p>
            </div>
        `;

        restaurantCards.appendChild(card);
    });
}

function formatText(text) {
    return text.replaceAll("_", " ");
}

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        if (filter === "all") {
            createRestaurantCards(allPlaces.slice(0, 12));
        } else {
            const filteredPlaces = allPlaces.filter(function(place) {
                return place.tags.amenity === filter;
            });

            createRestaurantCards(filteredPlaces.slice(0, 12));
        }
    });
});

loadRestaurants();
