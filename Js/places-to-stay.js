const ptsCardsContainer = document.getElementById("ptsCardsContainer");
const ptsFilterButtons = document.querySelectorAll(".pts_filter_btn");

let stays = [];

async function loadStays() {
    try {
        const response = await fetch("/Res/Data/places-to-stay.json");

        if (!response.ok) {
            throw new Error("Could not load places-to-stay.json");
        }

        stays = await response.json();
        showStays("all");

    } catch (error) {
        console.error("Places to stay error:", error);

        ptsCardsContainer.innerHTML = `
            <p class="pts_error">Could not load places to stay.</p>
        `;
    }
}

function showStays(type) {
    ptsCardsContainer.innerHTML = "";

    let filteredStays = stays;

    if (type !== "all") {
        filteredStays = stays.filter(function(stay) {
            return stay.type === type;
        });
    }

    filteredStays.forEach(function(stay) {
        const card = document.createElement("div");
        card.classList.add("pts_stay_card");

        card.innerHTML = `
            <img src="${stay.image}" alt="${stay.name}">

            <div class="pts_stay_card_content">
                <p class="pts_stay_type">${stay.type}</p>
                <h3>${stay.name}</h3>
                <p class="pts_location">
                    <i class="fa-solid fa-location-dot"></i>
                    ${stay.location}
                </p>
                <p class="pts_description">${stay.description}</p>
                <p class="pts_best_for"><strong>Best for:</strong> ${stay.bestFor}</p>
            </div>
        `;

        ptsCardsContainer.appendChild(card);
    });
}

ptsFilterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        ptsFilterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const stayType = button.dataset.type;
        showStays(stayType);
    });
});

loadStays();