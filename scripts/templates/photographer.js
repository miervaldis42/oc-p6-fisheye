function photographerPageTemplate(data) {
  const { photographer } = data;
  const { name, portrait, city, country, tagline } = photographer;

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

  return {
    data,
    photographerHeaderTemplate,
  };
}

export default photographerPageTemplate;
