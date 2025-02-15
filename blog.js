document.addEventListener("DOMContentLoaded", async function () {
    const cardContainer = document.getElementById("card-container");
    const errorMessageContainer = document.getElementById("error-message");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const paginationContainer = document.getElementById("pagination-container");

    let currentPage = 1;
    const rowsPerPage = 6;
    let allCards = []; // Store all cards for pagination

    try {
        const response = await fetch("blog-data.json");
        if (!response.ok) {
            throw new Error(`Failed to load blog data: ${response.status}`);
        }
        const data = await response.json();
        allCards = data; // Store all cards
        paginateCards(allCards, cardContainer, rowsPerPage, currentPage);
        setupPagination(allCards, cardContainer, rowsPerPage);
        setupFilters(allCards);

        //Enable filtering by clicking on the tags.
        attachTagListeners(allCards);

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
                filterButtons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");

                const filter = this.getAttribute("data-filter");
                const filteredCards = filter === "all" ? cards : cards.filter(card => card.tags.includes(filter));

                // Reset to page 1 when filtering
                currentPage = 1;
                paginateCards(filteredCards, cardContainer, rowsPerPage, currentPage);
                setupPagination(filteredCards, cardContainer, rowsPerPage);
                attachTagListeners(filteredCards); // Re-attach listeners after filtering

            });
        });
    }

     function filterCards(filter, cards) {
        // Create a new array with only the cards that should be displayed
        const filteredCards = filter ? cards.filter(card => card.tags.includes(filter)) : cards;

        // Reset to page 1 when filtering
        currentPage = 1;
        paginateCards(filteredCards, cardContainer, rowsPerPage, currentPage);
        setupPagination(filteredCards, cardContainer, rowsPerPage);

        //Re-attach the listeners to the tags.
        attachTagListeners(filteredCards);
    }

    function attachTagListeners(cards) {
      document.querySelectorAll(".tag").forEach(tagElement => {
        tagElement.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent default link behavior
          const tagFilter = this.getAttribute("data-filter");
           // Find and activate the corresponding filter button
          filterButtons.forEach(btn => {
              if (btn.getAttribute('data-filter') === tagFilter) {
                  btn.click(); // Simulate a click on the filter button
              } else if (btn.getAttribute('data-filter') === 'all') { //Deactivate the all
                  btn.classList.remove('active');
              }
          });
        });
      });
    }



    function paginateCards(cards, cardContainer, rowsPerPage, page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedCards = cards.slice(start, end);
        renderCards(paginatedCards);
    }

  function setupPagination(cards, cardContainer, rowsPerPage) {
    paginationContainer.innerHTML = ""; // Clear previous pagination buttons
    const pageCount = Math.ceil(cards.length / rowsPerPage);

    // Previous Button
    const prevButton = document.createElement("button");
    prevButton.innerText = "Previous";
    prevButton.classList.add("btn", "btn-outline-secondary", "mx-1");
    prevButton.disabled = currentPage === 1; // Disable on first page
    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            paginateCards(cards, cardContainer, rowsPerPage, currentPage);
            setupPagination(cards, cardContainer, rowsPerPage); // Re-render pagination
        }
    });
    paginationContainer.appendChild(prevButton);

    // Page Number Buttons
    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.classList.add("btn", "btn-outline-secondary", "mx-1");
        if (i === currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", function () {
            currentPage = i;
            paginateCards(cards, cardContainer, rowsPerPage, currentPage);
            setupPagination(cards, cardContainer, rowsPerPage); // Re-render pagination
        });
        paginationContainer.appendChild(button);
    }

    // Next Button
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.classList.add("btn", "btn-outline-secondary", "mx-1");
    nextButton.disabled = currentPage === pageCount; // Disable on last page
    nextButton.addEventListener("click", function () {
        if (currentPage < pageCount) {
            currentPage++;
            paginateCards(cards, cardContainer, rowsPerPage, currentPage);
            setupPagination(cards, cardContainer, rowsPerPage); // Re-render pagination
        }
    });
    paginationContainer.appendChild(nextButton);
}
});
