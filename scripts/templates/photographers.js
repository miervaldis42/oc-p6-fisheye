function photographerTemplate(data) {
  const { name, portrait } = data;

  const picture = `assets/photographers/photos/${portrait}`;

  function getUserCardDOM() {
    // Photographer Card
    const article = document.createElement("article");
    article.setAttribute("aria-label", name);

    // Photo
    const img = document.createElement("img");
    img.setAttribute("src", picture);

    // Name
    const h2 = document.createElement("h2");
    h2.textContent = name;

    article.appendChild(img);
    article.appendChild(h2);

    return article;
  }

  return { data, getUserCardDOM };
}

export default photographerTemplate;
