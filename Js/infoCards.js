const infoCardsContainer = document.getElementById("infoCardsContainer");

async function loadInfoCards() {
    try {
        const response = await fetch("../Data/info-cards.JSON");

        if (!response.ok) {
            throw new Error("Could not load JSON file.");
        }

        const topics = await response.json();

        createInfoCards(topics);

    } catch (error) {
        console.error("JSON loading error:", error);

        infoCardsContainer.innerHTML = `
            <p class="error_message">Could not load Columbus information.</p>
        `;
    }
}

function createInfoCards(topics) {
    infoCardsContainer.innerHTML = "";

    topics.forEach(function(topic, topicIndex) {
        const card = document.createElement("div");

        card.classList.add("info_card");

        if (topicIndex % 2 === 1) {
            card.classList.add("reverse");
        }

        card.innerHTML = `
            <div class="info_img_container">
                <div class="slideshow_container">
                    <img 
                        class="slide_image" 
                        src="${topic.slides[0].image}" 
                        alt="${topic.slides[0].caption}"
                    >

                    <p class="slide_caption">
                        ${topic.slides[0].caption}
                    </p>

                    <div class="slide_hover">
                        <p class="slide_info">
                            ${topic.slides[0].info}
                        </p>
                    </div>
                </div>
            </div>

            <div class="info_text_container">
                <div class="info_header">
                    <h2 class="title_text">${topic.title}</h2>
                </div>

                <div class="text_card">
                    <p class="description_text">${topic.description}</p>

                    <button class="info_button">
                        ${topic.buttonText}
                    </button>
                </div>
            </div>
        `;

        infoCardsContainer.appendChild(card);

        startCardSlideshow(card, topic.slides);
    });
}

function startCardSlideshow(card, slides) {
    const image = card.querySelector(".slide_image");
    const caption = card.querySelector(".slide_caption");
    const info = card.querySelector(".slide_info");

    let currentSlide = 0;

    setInterval(function() {
        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        image.src = slides[currentSlide].image;
        image.alt = slides[currentSlide].caption;

        caption.textContent = slides[currentSlide].caption;
        info.textContent = slides[currentSlide].info;

    }, 4000);
}

loadInfoCards();