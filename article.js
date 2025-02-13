document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("id");
    const articleContainer = document.getElementById("article-content");

    if (articleId) {
        fetch("articles.json")
            .then(response => response.json())
            .then(articles => {
                const article = articles.find(a => a.id === articleId);
                if (article) {
                    articleContainer.innerHTML = `
                        <h2>${article.title}</h2>
                        <p><strong>By:</strong> ${article.author} | <strong>Date:</strong> ${article.date}</p>
                        <div>${article.content}</div>
                        <p><strong>Tags:</strong> ${article.tags.map(tag => `<span class="badge bg-secondary">${tag}</span>`).join(" ")}</p>
                    `;
                } else {
                    articleContainer.innerHTML = "<p>Article not found.</p>";
                }
            })
            .catch(error => console.error("Error loading article data:", error));
    } else {
        articleContainer.innerHTML = "<p>No article selected.</p>";
    }
});
