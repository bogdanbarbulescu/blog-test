document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("id");
    const articleContainer = document.getElementById("article-content");
    const errorMessageContainer = document.getElementById("error-message");

    if (articleId) {
        try {
            // Fetch the Markdown content
            const mdResponse = await fetch(`articles/${articleId}.md`);
            if (!mdResponse.ok) {
                throw new Error(`Failed to load Markdown file: ${mdResponse.status}`);
            }
            const markdown = await mdResponse.text();

            // Fetch blog-data.json to get article metadata
            const jsonResponse = await fetch("blog-data.json");
            if (!jsonResponse.ok) {
              throw new Error(`Failed to load blog data: ${jsonResponse.status}`);
            }
            const blogData = await jsonResponse.json();

            // Find the corresponding article in blog-data.json
            const articleData = blogData.find(a => `article${blogData.indexOf(a) + 1}` === articleId); //Correct id

            if (!articleData) {
              throw new Error(`Article data not found for ID: ${articleId}`);
            }


            // Convert Markdown to HTML using marked.js
            const htmlContent = marked.parse(markdown);

            // Combine metadata and HTML content
            articleContainer.innerHTML = `
                <h1 class="article-title">${articleData.title}</h1>
                <div class="article-meta">
                  <!-- Removed author and date as they don't exist in the data -->
                </div>
                <div class="article-body">${htmlContent}</div>
                <p><strong>Tags:</strong> ${articleData.tags.map(tag => `<span class="badge bg-secondary">${tag}</span>`).join(" ")}</p>
            `;


        } catch (error) {
            console.error("Error:", error);
            errorMessageContainer.textContent = "Error loading article. Please try again later.";
            errorMessageContainer.style.display = "block";
            articleContainer.innerHTML = ""; // Clear any partial content
        }
    } else {
        errorMessageContainer.textContent = "No article selected.";
        errorMessageContainer.style.display = "block";
    }
});
