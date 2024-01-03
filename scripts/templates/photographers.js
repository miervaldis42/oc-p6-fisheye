function photographerTemplate(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/photos/${portrait}`;

  function getUserCardDOM() {
    // Photographer Card
    const clickableCard = document.createElement("a");
    clickableCard.href = `/photographer?id=${id}`;
    clickableCard.ariaLabel = `To ${name}'s page`;

    const photographerArticle = document.createElement("article");
    photographerArticle.setAttribute("aria-label", name);
    photographerArticle.className = "photographer-article";

    // Photo
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");

    // Name
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.className = "photographerName secondary-font";

    // City & Country
    const location = document.createElement("p");
    location.className = "location primary-font";
    location.textContent = `${city}, ${country}`;

    // Tagline
    const slogan = document.createElement("p");
    slogan.textContent = tagline;

    // Man-Day Price
    const dayPrice = document.createElement("p");
    dayPrice.className = "price";
    dayPrice.textContent = `${price}€/jour`;

    // Article Builder
    photographerArticle.appendChild(img);
    photographerArticle.appendChild(h2);
    photographerArticle.appendChild(location);
    photographerArticle.appendChild(slogan);
    photographerArticle.appendChild(dayPrice);

    // Make the photographe <article> clickable
    clickableCard.appendChild(photographerArticle);

    return clickableCard;
  }

  return { data, getUserCardDOM };
}

export default photographerTemplate;
