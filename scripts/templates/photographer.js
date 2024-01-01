function photographerPageTemplate(data) {
  // Data
  const { photographer, media } = data;
  const { name, portrait, city, country, tagline, price } = photographer;
  let initialTotalLikes = media.reduce((sum, item) => sum + item.likes, 0);

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
    const sortArea = document.createElement("sortArea");
    sortArea.className = "portfolio-section";
    sortArea.ariaLabel = "Filtrer par";

    const sort = document.createElement("label");
    sort.textContent = "Trier par";
    sort.htmlFor = "dropdown";
    sort.className = "sortLabel";

    const dropdown = document.createElement("select");
    dropdown.setAttribute("id", "dropdown");
    dropdown.setAttribute("name", "sort");
    dropdown.className = "button";

    const options = ["Popularité", "Date", "Titre"];
    options.forEach((o) => {
      const option = document.createElement("option");
      option.value = o;
      option.textContent = o;

      dropdown.appendChild(option);
    });

    sortArea.appendChild(sort);
    sortArea.appendChild(dropdown);

    // Portfolio Media
    const portfolioGrid = document.createElement("div");
    portfolioGrid.className = "portfolio";

    portfolioSection.appendChild(sortArea);
    portfolioSection.appendChild(portfolioGrid);

    // Portfolio Builder
    const firstname = name.split(" ")[0];
    function displayPortfolioMedia(medium) {
      // Build each media article
      medium.forEach((m) => {
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

        // 'Like' Button
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

        // Toggle the like state (increment or decrease)
        likesButton.addEventListener("click", () => {
          if (Number(span.textContent) === m.likes) {
            span.textContent = m.likes + 1;
            updateTotalLikes(true);
          } else {
            span.textContent = m.likes;
            updateTotalLikes(false);
          }
        });

        article.appendChild(figure);
        figure.appendChild(photographerWorkTitle);
        photographerWorkTitle.appendChild(likesButton);

        portfolioGrid.appendChild(article);
      });
    }

    // Sort media
    function sortPortfolio(value) {
      if (value === "Titre") {
        media.sort((a, b) => a.title.localeCompare(b.title));
      } else if (value === "Date") {
        media.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else {
        media.sort((a, b) => b.likes - a.likes);
      }

      while (portfolioGrid.firstChild) {
        portfolioGrid.removeChild(portfolioGrid.firstChild);
      }

      // Add sorted articles back to the portfolio
      displayPortfolioMedia(media);
    }
    sortPortfolio();

    // Modify the dropdown event listener to call the sortPortfolio function
    dropdown.addEventListener("change", (event) => {
      const selectedValue = event.target.value;
      sortPortfolio(selectedValue);
    });

    return portfolioSection;
  }

  // Insert
  function photographerPriceAndTotalLikesTemplate() {
    const insert = document.createElement("div");
    insert.className = "insert secondary-background";

    // Likes
    const portfolioTotalLikes = document.createElement("p");
    portfolioTotalLikes.id = "portfolioTotalLikes";
    portfolioTotalLikes.innerHTML = initialTotalLikes;

    const heart = document.createElement("img");
    heart.setAttribute("src", "assets/icons/heart.svg");
    heart.alt = "Icône de likes";
    heart.className = "heart";

    portfolioTotalLikes.appendChild(heart);
    insert.appendChild(portfolioTotalLikes);

    // Price
    const priceText = document.createElement("p");
    priceText.textContent = `${price}€/jour`;

    insert.appendChild(priceText);

    return insert;
  }

  // Modify the portfolio's total likes in the Insert
  function updateTotalLikes(likeIsIncreasing) {
    const portfolioTotalLikesElement = document.getElementById(
      "portfolioTotalLikes"
    );

    // Increase or Decrease the count
    initialTotalLikes += likeIsIncreasing ? 1 : -1;
    portfolioTotalLikesElement.innerHTML = initialTotalLikes;

    // Heart Icon
    const icon = document.createElement("img");
    icon.setAttribute("src", "assets/icons/heart.svg");
    icon.alt = "Likes";
    icon.className = "heart";
    portfolioTotalLikesElement.appendChild(icon);
  }

  return {
    data,
    photographerHeaderTemplate,
    photographerPortfolioTemplate,
    photographerPriceAndTotalLikesTemplate,
  };
}

export default photographerPageTemplate;
