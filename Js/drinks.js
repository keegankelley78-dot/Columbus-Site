const drinksContainer = document.getElementById("drinksCardsContainer");
const drinksStatus = document.getElementById("drinksStatus");
const drinksSearch = document.getElementById("drinksSearch");
const loadDrinksBtn = document.getElementById("loadDrinksBtn");

let drinkSpots = [];

const drinkImages = [
    "../Res/Pics/Drinks/drink-1.jpg",
    "../Res/Pics/Drinks/drink-2.jpg",
    "../Res/Pics/Drinks/drink-3.jpg",
    "../Res/Pics/Drinks/drink-4.jpg"
];

async function getDrinkSpots() {
    drinksStatus.textContent = "Loading drink spots...";
    drinksContainer.innerHTML = "";

    const apiQuery = `
        [out:json][timeout:25];
        area["name"="Columbus"]["boundary"="administrative"]->.area;
        (
            node["amenity"="cafe"](area.area);
            node["amenity"="bar"](area.area);
            node["amenity"="pub"](area.area);
        );
        out tags 24;
    `;

    try {
        const response = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            body: apiQuery
        });

        const data = await response.json();

        drinkSpots = data.elements
            .filter(place => place.tags.name)
            .map((place, index) => {
                return {
                    name: place.tags.name,
                    type: place.tags.amenity || "Drink Spot",
                    address: place.tags["addr:street"] || "Columbus, OH",
                    website: place.tags.website || "",
                    image: drinkImages[index % drinkImages.length]
                };
            });

        showDrinkSpots(drinkSpots);
        drinksStatus.textContent = `Showing ${drinkSpots.length} drink spots.`;

    } catch (error) {
        console.log(error);
        drinksStatus.textContent = "Could not load drink spots.";
    }
}

function showDrinkSpots(list) {
    drinksContainer.innerHTML = "";

    list.forEach(drink => {
        drinksContainer.innerHTML += `
            <div class="drinks_card">
                <div class="drinks_card_img">
                    <img 
                        src="${drink.image}" 
                        alt="${drink.name}"
                        onerror="this.parentElement.classList.add('no_img'); this.remove();"
                    >
                </div>

                <div class="drinks_card_content">
                    <span class="drinks_tag">${formatDrinkType(drink.type)}</span>
                    <h2>${drink.name}</h2>
                    <p>${drink.address}</p>

                    ${
                        drink.website
                        ? `<a href="${drink.website}" target="_blank" class="drinks_card_btn">Visit Website</a>`
                        : `<p>No website listed</p>`
                    }
                </div>
            </div>
        `;
    });
}

function formatDrinkType(type) {
    if (type === "cafe") {
        return "Café";
    }

    if (type === "bar") {
        return "Bar";
    }

    if (type === "pub") {
        return "Pub";
    }

    return "Drink Spot";
}

function searchDrinkSpots() {
    const searchValue = drinksSearch.value.toLowerCase();

    const filtered = drinkSpots.filter(drink => {
        return drink.name.toLowerCase().includes(searchValue) ||
               drink.type.toLowerCase().includes(searchValue) ||
               drink.address.toLowerCase().includes(searchValue);
    });

    showDrinkSpots(filtered);
    drinksStatus.textContent = `Showing ${filtered.length} drink spots.`;
}

loadDrinksBtn.addEventListener("click", getDrinkSpots);
drinksSearch.addEventListener("input", searchDrinkSpots);

getDrinkSpots();