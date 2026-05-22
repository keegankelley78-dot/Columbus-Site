function createSubjectCards(cards) {

    restaurantsCardContainer.innerHTML = "";

    if (!cards || cards.length === 0) {
        restaurantsCardContainer.innerHTML = `
            <p class="error_message">
                No restaurants found.
            </p>
        `;
        return;
    }

    cards.slice(0, 12).forEach(function(card) {

        const name = card.tags?.name || "Restaurant";

        const cuisine = card.tags?.cuisine
            ? card.tags.cuisine.replace(/;/g, ", ")
            : "Local Columbus restaurant";

        const cardElement = document.createElement("div");

        cardElement.classList.add("restaurants_card");

        const randomImg = `https://picsum.photos/600/400?random=${Math.random()}`;

        cardElement.style.backgroundImage = `
            linear-gradient(rgba(0, 40, 85, 0.55), rgba(0, 40, 85, 0.78)),
            url("${randomImg}")
        `;

        cardElement.innerHTML = `
            <div class="restaurants_card_content">
                <h2>${name}</h2>
                <p>${cuisine}</p>

                <a 
                    href="https://www.google.com/maps?q=${card.lat},${card.lon}" 
                    target="_blank"
                    class="restaurants_btn"
                >
                    View Location
                </a>
            </div>
        `;

        restaurantsCardContainer.appendChild(cardElement);
    });
}