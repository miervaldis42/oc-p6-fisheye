function photographerPageTemplate(data) {
  const { photographer, media } = data;
  const { name, portrait, city, country, tagline, price } = photographer;

  // Header
  function photographerHeaderTemplate() {
    const photographerHeader = document.createElement("section");
    photographerHeader.className = "photograph-header";
    photographerHeader.ariaLabel =
      "Section contenant les informations du/de la photographe";

    const photographerInfo = document.createElement("div");

    // Name
    const h1 = document.createElement("h1");
    h1.textContent = name;
    h1.className = "photograph-name";

    // City & Country
    const location = document.createElement("p");
    location.className = "location";
    location.textContent = `${city}, ${country}`;

    // Tagline
    const slogan = document.createElement("p");
    slogan.textContent = tagline;
    slogan.className = "tagline";

    // 'Contact me' button
    const contactButton = document.createElement("button");
    contactButton.type = "button";
    contactButton.textContent = "Contactez-moi";
    contactButton.className = "contact-button button";
    contactButton.onclick = "displayModal()";

    // Photo
    const picture = `assets/photographers/photos/${portrait}`;
    const photographerPhoto = document.createElement("img");
    photographerPhoto.setAttribute("src", picture);
    photographerPhoto.setAttribute("alt", name);
    photographerPhoto.className = "picture";

    photographerInfo.appendChild(h1);
    photographerInfo.appendChild(location);
    photographerInfo.appendChild(slogan);

    photographerHeader.appendChild(photographerInfo);
    photographerHeader.appendChild(contactButton);
    photographerHeader.appendChild(photographerPhoto);

    return photographerHeader;
  }

  // Portfolio
  function photographerPortfolioTemplate() {
    const portfolioSection = document.createElement("section");

    // Filter
    const div = document.createElement("div");
    div.className = "portfolio-section";
    div.ariaLabel = "Filtrer par";

    const filter = document.createElement("label");
    filter.textContent = "Trier par";
    filter.htmlFor = "dropdown";
    filter.className = "filterLabel";

    const dropdown = document.createElement("select");
    dropdown.setAttribute("id", "dropdown");
    dropdown.setAttribute("name", "filters");
    dropdown.className = "button";

    const options = ["Popularité", "Date", "Titre"];
    options.forEach((o) => {
      const option = document.createElement("option");
      option.value = o;
      option.textContent = o;

      dropdown.appendChild(option);
    });

    div.appendChild(filter);
    div.appendChild(dropdown);

    // Portfolio
    const portfolioGrid = document.createElement("div");
    portfolioGrid.className = "portfolio";

    const firstname = name.split(" ")[0];
    media.forEach((m) => {
      const article = document.createElement("article");

      const figure = document.createElement("figure");
      figure.role = "group";

      // Image or Video
      if (m.image !== undefined) {
        const photographerWorkImage = document.createElement("img");
        photographerWorkImage.setAttribute(
          "src",
          `assets/photographers/${firstname}/${m.image}`
        );
        photographerWorkImage.setAttribute("alt", m.title);
        photographerWorkImage.className = "work";

        figure.appendChild(photographerWorkImage);
      } else {
        const photographerWorkVideo = document.createElement("video");
        photographerWorkVideo.setAttribute(
          "src",
          `assets/photographers/${firstname}/${m.video}`
        );
        photographerWorkVideo.setAttribute("alt", m.title);
        photographerWorkVideo.className = "work";

        figure.appendChild(photographerWorkVideo);
      }

      const photographerWorkTitle = document.createElement("figcaption");
      photographerWorkTitle.textContent = m.title;
      photographerWorkTitle.className = "work-caption primary-font";

      // Likes
      const likesButton = document.createElement("button");
      likesButton.ariaLabel = "Nombres de likes";
      likesButton.className = "like-button primary-font";

      const icon = document.createElement("img");
      icon.setAttribute("src", "assets/icons/heart.svg");
      icon.alt = "Likes";
      icon.className = "heart";

      const span = document.createElement("span");
      span.textContent = m.likes;

      likesButton.appendChild(span);
      likesButton.appendChild(icon);

      article.appendChild(figure);
      figure.appendChild(photographerWorkTitle);
      photographerWorkTitle.appendChild(likesButton);

      portfolioGrid.appendChild(article);
    });

    // Appendices
    portfolioSection.appendChild(div);
    portfolioSection.appendChild(portfolioGrid);

    return portfolioSection;
  }

  // Insert
  function photographerPriceAndTotalLikesTemplate() {
    const insert = document.createElement("div");
    insert.className = "insert secondary-background";

    // Likes
    const totalLikes = media.reduce((sum, item) => sum + item.likes, 0);
    const portfolioTotalLikes = document.createElement("p");
    portfolioTotalLikes.textContent = totalLikes;

    const heart = document.createElement("img");
    heart.setAttribute("src", "assets/icons/heart.svg");
    heart.alt = "Likes";
    heart.className = "heart";

    portfolioTotalLikes.appendChild(heart);
    insert.appendChild(portfolioTotalLikes);

    // Price
    const priceText = document.createElement("p");
    priceText.textContent = `${price}€/jour`;

    insert.appendChild(priceText);

    return insert;
  }

  return {
    data,
    photographerHeaderTemplate,
    photographerPortfolioTemplate,
    photographerPriceAndTotalLikesTemplate,
  };
}

export default photographerPageTemplate;
