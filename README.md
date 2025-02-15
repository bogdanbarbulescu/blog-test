# Modern Blog Project

This project is a simple, modern blog built with HTML, CSS, JavaScript, and Markdown. It demonstrates dynamic content loading, filtering, and responsive design.

## Features

*   **Dynamic Content:** Blog posts and articles are loaded dynamically from JSON and Markdown files.
*   **Filtering:**  Posts can be filtered by category using buttons.
*   **Markdown Support:**  Article content is written in Markdown for easy formatting and editing.
*   **Responsive Design:** The layout adapts to different screen sizes (desktop, tablet, mobile).
*   **Clean Code:**  Uses modern JavaScript (async/await) and CSS (Flexbox, Grid) for maintainability.
*   **Error Handling:** Includes basic error handling for failed data loading.
*   **Accessibility:** Includes ARIA roles.

## Project Structure

```bash
blog-project/
├── README.md (This file)
├── index.html (Main blog page)
├── styles.css (Global styles)
├── blog.js (JavaScript for the main blog page)
├── article.html (Article display page)
├── article.js (JavaScript for the article page)
├── articles/ (Directory for article Markdown files)
│ ├── article1.md (Example article)
│ ├── article2.md (Example article)
└── blog-data.json (JSON data for blog post summaries)
```

## How to Run

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd blog-project
    ```
2.  **Open `index.html` in your browser.**  No server is required for this simple project.  You can just double-click the `index.html` file.

## Adding New Articles

1.  **Create a new Markdown file** in the `articles/` directory (e.g., `article3.md`).
2.  **Write your article content** in Markdown format.
3.  **Add a new entry** to `blog-data.json` with the following structure:

    ```json
    {
        "title": "Your Article Title",
        "description": "A short description of the article.",
        "category": "The category of the article (e.g., Web Security)",
        "tags": ["tag1", "tag2", "tag3"],
        "url": "article.html?id=article3"
    }
    ```
     Make sure the `id` in the `url` matches the filename of your Markdown file (without the `.md` extension).

## Dependencies

*   **Bootstrap 5.3.0:**  Used for basic styling and responsiveness (included via CDN).  You could replace this with your own CSS if you prefer.
*  **marked.js:** A markdown parser. It is added via a CDN.

## Contributing

Feel free to fork this repository and submit pull requests with improvements or new features.
