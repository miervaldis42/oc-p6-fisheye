function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

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

    // City & Country
    const location = document.createElement("p");
    location.className = "location";
    location.textContent = `${city}, ${country}`;

    // Tagline
    const slogan = document.createElement("p");
    slogan.textContent = tagline;

    // Man-Day Price
    const dayPrice = document.createElement("p");
    dayPrice.className = "price";
    dayPrice.textContent = `${price}€/jour`;

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(slogan);
    article.appendChild(dayPrice);

    return article;
  }

  return { data, getUserCardDOM };
}

export default photographerTemplate;
