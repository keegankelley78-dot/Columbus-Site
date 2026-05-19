function createAttrationCards(attrations) {
    attrationsContainer.innerHTML = "";

    attrations.forEach(attration => {
        const card = document.createElement("div");

        card.classList.add("attrations_card");
        card.id = attration.id;

        card.innerHTML = `
            <div class="attrations_top">
                <div class="attrations_text">
                    <h1>${attration.title}</h1>

                    <p>${attration.description}</p>

                    <button class="toggle">More Info</button>
                </div>

                <div class="attrations_main_img">
                    <img src="${attration.mainImage}" alt="${attration.mainImageAlt}">
                </div>
            </div>

            <div class="attrations_drop_down">
                ${createPlaces(attration.places)}
            </div>
        `;

        attrationsContainer.appendChild(card);
    });

    setupAttrationButtons();
}