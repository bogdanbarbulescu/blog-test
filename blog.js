document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("card-container");

    // Load JSON data
    fetch("blog-data.json")
        .then(response => response.json())
        .then(data => {
            renderCards(data);
            setupFilters(data);
        })
        .catch(error => console.error("Error loading blog data:", error));

    function renderCards(cards) {
        cardContainer.innerHTML = "";
        cards.forEach(card => {
            const cardHTML = `
                <div class="col-md-4 mb-4" data-tags="${card.tags.join(", ")}">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${card.title}</h5>
                            <p class="card-text">${card.description}</p>
                            <div class="card-tags">
                                ${card.tags.map(tag => `<span class="badge bg-secondary tag">${tag}</span>`).join(" ")}
                            </div>
                            <a href="${card.url}" class="btn btn-outline-warning">Read</a>
                        </div>
                    </div>
                </div>
            `;
            cardContainer.innerHTML += cardHTML;
        });

        // Enable filtering by tag click
        document.querySelectorAll(".tag").forEach(tag => {
            tag.addEventListener("click", function () {
                filterCards(this.innerText);
            });
        });
    }

    function setupFilters(cards) {
        document.querySelectorAll(".filter-btn").forEach(button => {
            button.addEventListener("click", function () {
                const filter = this.getAttribute("data-filter");
                filterCards(filter === "all" ? null : filter);
            });
        });
    }

    function filterCards(filter) {
        const cards = document.querySelectorAll("#card-container .col-md-4");
        cards.forEach(card => {
            const tags = card.getAttribute("data-tags").split(", ");
            if (!filter || tags.includes(filter)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }
});
