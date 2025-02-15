document.addEventListener("DOMContentLoaded", async function () {
    const cardContainer = document.getElementById("card-container");
    const errorMessageContainer = document.getElementById("error-message");
    const filterButtons = document.querySelectorAll(".filter-btn");

    try {
        const response = await fetch("blog-data.json");
        if (!response.ok) {
            throw new Error(`Failed to load blog data: ${response.status}`);
        }
        const data = await response.json();
        renderCards(data);
        setupFilters(data);

        //Enable filtering by clicking on the tags.
        attachTagListeners();

    } catch (error) {
        console.error("Error:", error);
        errorMessageContainer.textContent = "Error loading blog data. Please try again later.";
        errorMessageContainer.style.display = "block";
    }


    function renderCards(cards) {
        cardContainer.innerHTML = ""; // Clear existing cards

        if (cards.length === 0) {
          cardContainer.innerHTML = `<p class="text-center">No articles found for this filter.</p>`;
          return;
        }

        cards.forEach(card => {
            const cardHTML = `
                <div class="col-md-4 mb-4" data-tags="${card.tags.join(", ")}">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${card.title}</h5>
                            <p class="card-text">${card.description}</p>
                            <div class="card-tags">
                                ${card.tags.map(tag => `<a href="#" class="tag" data-filter="${tag}">${tag}</a>`).join(" ")}
                            </div>
                            <a href="${card.url}" class="read-btn">Read</a>
                        </div>
                    </div>
                </div>
            `;
            cardContainer.innerHTML += cardHTML;
        });
    }

    function setupFilters(cards) {
        filterButtons.forEach(button => {
            button.addEventListener("click", function () {
                // Remove 'active' class from all buttons
                filterButtons.forEach(btn => btn.classList.remove("active"));
                // Add 'active' class to the clicked button
                this.classList.add("active");

                const filter = this.getAttribute("data-filter");
                filterCards(filter === "all" ? null : filter, cards);
            });
        });
    }

    function filterCards(filter, cards) {
        const cardElements = document.querySelectorAll("#card-container .col-md-4");

        // Create a new array with only the cards that should be displayed
        const filteredCards = filter ? cards.filter(card => card.tags.includes(filter)) : cards;

        //Render the filtered cards.
        renderCards(filteredCards);
        //Re-attach the listeners to the tags.
        attachTagListeners();
    }


    function attachTagListeners() {
        document.querySelectorAll(".tag").forEach(tagElement => {
            tagElement.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent default link behavior
                const tagFilter = this.getAttribute("data-filter");
                filterButtons.forEach(btn => btn.classList.remove('active'));
                filterCards(tagFilter,  JSON.parse(localStorage.getItem('blogData')));
            });
        });
    }
});
