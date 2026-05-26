const restaurantContainer = document.getElementById("restaurantCardsContainer");
const restaurantStatus = document.getElementById("restaurantStatus");
const searchInput = document.getElementById("restaurantSearch");
const loadBtn = document.getElementById("loadRestaurantsBtn");

let restaurants = [];

const restaurantImages = [
    "/Res/Pics/Restaurants/restaurant-1.jpg",
    "/Res/Pics/Restaurants/restaurant-2.jpg",
    "/Res/Pics/Restaurants/restaurant-3.jpg",
    "/Res/Pics/Restaurants/restaurant-4.jpg"
];

async function getRestaurants() {
    restaurantStatus.textContent = "Loading restaurants...";
    restaurantContainer.innerHTML = "";

    const apiQuery = `
        [out:json][timeout:25];
        area["name"="Columbus"]["boundary"="administrative"]->.area;
        node["amenity"="restaurant"](area.area);
        out tags 20;
    `;

    try {
        const response = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            body: apiQuery
        });

        const data = await response.json();

        restaurants = data.elements
            .filter(place => place.tags.name)
            .map((place, index) => {
                return {
                    name: place.tags.name,
                    cuisine: place.tags.cuisine || "Restaurant",
                    address: place.tags["addr:street"] || "Columbus, OH",
                    website: place.tags.website || "",
                    image: restaurantImages[index % restaurantImages.length]
                };
            });

        showRestaurants(restaurants);
        restaurantStatus.textContent = `Showing ${restaurants.length} restaurants.`;

    } catch (error) {
        console.log(error);
        restaurantStatus.textContent = "Could not load restaurants.";
    }
}

function showRestaurants(list) {
    restaurantContainer.innerHTML = "";

    list.forEach(restaurant => {
        restaurantContainer.innerHTML += `
            <div class="restaurant_card">
                <div class="restaurant_card_img">
                    <img src="${restaurant.image}" alt="${restaurant.name}">
                </div>

                <div class="restaurant_card_content">
                    <span class="restaurant_tag">${restaurant.cuisine}</span>
                    <h2>${restaurant.name}</h2>
                    <p>${restaurant.address}</p>

                    ${
                        restaurant.website
                        ? `<a href="${restaurant.website}" target="_blank" class="restaurant_card_btn">Visit Website</a>`
                        : `<p>No website listed</p>`
                    }
                </div>
            </div>
        `;
    });
}

function searchRestaurants() {
    const searchValue = searchInput.value.toLowerCase();

    const filtered = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(searchValue) ||
               restaurant.cuisine.toLowerCase().includes(searchValue);
    });

    showRestaurants(filtered);
    restaurantStatus.textContent = `Showing ${filtered.length} restaurants.`;
}

loadBtn.addEventListener("click", getRestaurants);
searchInput.addEventListener("input", searchRestaurants);

getRestaurants();