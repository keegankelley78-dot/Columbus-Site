const attrationsContainer = document.getElementById("attrationsContainer");

async function loadAttrations() {
    try {
        const response = await fetch("/Res/Data/attrations.json");

        if (!response.ok) {
            throw new Error("Could not load attrations JSON file.");
        }

        const attrations = await response.json();
        createAttrationCards(attrations);

    } 
    catch (error) {
        console.error("Attrations loading error:", error);

        attrationsContainer.innerHTML = `
            <p class="error_message">Could not load attractions.</p>
        `;
    }
}

function createAttrationCards(attrations) {
attrationsContainer.innerHTML = "";


attrations.forEach(attration => {
    
    const card = document.createElement("div");

    card.classList.add("attrations_card");

    console.log(attration.link)

    card.innerHTML = `

        <div class="attrations_top">

            <div class="attrations_text">

                <h1 id = "${attration.link}">${attration.title}</h1>



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

    function setupAttrationButtons() {

    const toggles = document.querySelectorAll(".toggle");



    toggles.forEach(toggle => {

        toggle.addEventListener("click", e => {

            const card = e.target.closest(".attrations_card");



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

loadAttrations();