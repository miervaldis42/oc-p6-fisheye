// Imports
import manageModal from "./modal";

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
      "Information about the photographer and a way to contact them.";

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
    contactButton.ariaLabel = "Contact me";
    contactButton.className = "contact-button button";

    // Modal
    const contactModal = document.querySelector("#contact-modal");
    const contactCloseButton = contactModal.querySelector(".close");
    manageModal(contactModal, contactButton, contactCloseButton);

    const titleContactModal = document.querySelector("dialog header h2");
    titleContactModal.innerHTML += `<br> ${name}`;

    const submitButton = document.querySelector("#contact-modal-submit");
    submitButton.addEventListener("click", () => {
      const firstname = document.querySelector("#firstname-input");
      const lastname = document.querySelector("#firstname-input");
      const email = document.querySelector("#email-input");
      const message = document.querySelector("#message-input");

      const dataEnteredByVisitor = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        message: message.value,
      };

      // Data to submit
      console.log(dataEnteredByVisitor);

      // Close modal
      const body = document.body;
      body.style.overflow = "auto";

      const dialog = document.querySelector("#contact-modal");
      dialog.close();
    });

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

  // Portfolio Section
  function photographerPortfolioTemplate() {
    const portfolioSection = document.createElement("section");
    portfolioSection.ariaLabel = `${name}'s portfolio`;
    portfolioSection.className = "portfolio-section";

    // Filter
    const sortArea = document.createElement("div");
    const sort = document.createElement("label");
    sort.textContent = "Trier par";
    sort.htmlFor = "dropdown";
    sort.className = "sortLabel";

    const dropdown = document.createElement("select");
    dropdown.setAttribute("id", "dropdown");
    dropdown.setAttribute("name", "sort");
    dropdown.ariaLabel =
      "Sort photographer's portfolio by the following options (By default, it is sorted by popularity)";
    dropdown.className = "button";

    const options = ["Popularité", "Date", "Titre"];
    options.forEach((o) => {
      const option = document.createElement("option");
      option.value = o;
      option.textContent = o;
      option.ariaLabel =
        o === "Popularité" ? "Popularity" : o === "Titre" ? "Title" : o;

      dropdown.appendChild(option);
    });

    sortArea.appendChild(sort);
    sortArea.appendChild(dropdown);

    // Portfolio Media
    const portfolioGrid = document.createElement("div");
    portfolioGrid.ariaLabel = `${name}'s portfolio`;
    portfolioGrid.className = "portfolio";

    portfolioSection.appendChild(sortArea);
    portfolioSection.appendChild(portfolioGrid);

    // Portfolio Builder
    const firstname = name.split(" ")[0];
    function displayPortfolioMedia(medium) {
      // Build each media article
      medium.forEach((m, index) => {
        const mediaLink = document.createElement("a");
        mediaLink.href = "javascript:void(0);";

        const mediaArticle = document.createElement("article");
        mediaArticle.ariaLabel = `${m.title} thumbnail`;
        mediaArticle.className = "media";

        const figure = document.createElement("figure");
        figure.role = "group";

        // Image or Video
        if (m.image) {
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
          photographerWorkVideo.setAttribute("aria-label", m.title);
          photographerWorkVideo.className = "work";

          figure.appendChild(photographerWorkVideo);
        }

        const photographerWorkTitle = document.createElement("figcaption");
        photographerWorkTitle.textContent = m.title;
        photographerWorkTitle.className = "work-caption primary-font";
        figure.appendChild(photographerWorkTitle);

        // 'Like' Button
        const likesButton = document.createElement("button");
        likesButton.ariaLabel = `${m.title} -  Likes counter`;
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
        likesButton.addEventListener("click", (e) => {
          e.stopPropagation();

          if (Number(span.textContent) === m.likes) {
            span.textContent = m.likes + 1;
            updateTotalLikes(true);
          } else {
            span.textContent = m.likes;
            updateTotalLikes(false);
          }
        });

        photographerWorkTitle.appendChild(likesButton);

        mediaArticle.appendChild(figure);
        mediaLink.appendChild(mediaArticle);
        portfolioGrid.appendChild(mediaLink);

        // Modal
        const lightboxModal = document.querySelector("#lightbox-modal");
        const lightboxCloseButton = lightboxModal.querySelector(".close");
        manageModal(lightboxModal, mediaLink, lightboxCloseButton);

        // Lightbox Builder
        mediaLink.addEventListener("click", () => {
          // Navigation Controls
          const previousButton = document.createElement("img");
          previousButton.src = "assets/icons/caret-left.svg";
          previousButton.ariaLabel = "Previous media";
          previousButton.tabIndex = "0";
          previousButton.className = "lightbox-nav-button";

          previousButton.addEventListener("keydown", (e) => {
            if (e.key === "Enter") lightboxMediaBuilder(medium[--index]);
          });
          previousButton.addEventListener("click", () => {
            lightboxMediaBuilder(medium[--index]);
          });

          const nextButton = document.createElement("img");
          nextButton.src = "assets/icons/caret-right.svg";
          nextButton.ariaLabel = "Next media";
          nextButton.tabIndex = "0";
          nextButton.className = "lightbox-nav-button";

          nextButton.addEventListener("keydown", (e) => {
            if (e.key === "Enter") lightboxMediaBuilder(medium[++index]);
          });
          nextButton.addEventListener("click", () => {
            lightboxMediaBuilder(medium[++index]);
          });

          // Media Lightbox
          function lightboxMediaBuilder(selectedMedia) {
            const lightbox = document.querySelector("#lightbox-modal-content");
            lightbox.innerHTML = "";
            const lightboxMedia = document.createElement("figure");
            lightboxMedia.role = "group";

            // Image or Video
            if (selectedMedia.image !== undefined) {
              const imageToDisplay = document.createElement("img");
              imageToDisplay.setAttribute(
                "src",
                `assets/photographers/${firstname}/${selectedMedia.image}`
              );
              imageToDisplay.setAttribute("alt", selectedMedia.title);
              imageToDisplay.className = "work";

              lightboxMedia.appendChild(imageToDisplay);
            } else {
              const videoToDisplay = document.createElement("video");
              videoToDisplay.setAttribute(
                "src",
                `assets/photographers/${firstname}/${selectedMedia.video}`
              );
              videoToDisplay.setAttribute("aria-label", selectedMedia.title);
              videoToDisplay.setAttribute("controls", "");
              videoToDisplay.className = "work";

              lightboxMedia.appendChild(videoToDisplay);
            }

            const mediaCaption = document.createElement("figcaption");
            mediaCaption.textContent = selectedMedia.title;
            mediaCaption.className = "work-caption primary-font";
            lightboxMedia.appendChild(mediaCaption);

            if (medium.indexOf(selectedMedia) === 0) {
              lightbox.appendChild(lightboxMedia);
              lightbox.appendChild(nextButton);
            } else if (medium.indexOf(selectedMedia) === medium.length - 1) {
              lightbox.appendChild(previousButton);
              lightbox.appendChild(lightboxMedia);
            } else {
              lightbox.appendChild(previousButton);
              lightbox.appendChild(lightboxMedia);
              lightbox.appendChild(nextButton);
            }
          }

          lightboxMediaBuilder(m);
        });
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

      // Add sorted mediaArticles back to the portfolio
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
    insert.ariaLabel =
      "Photographer Additional Info : Number of likes in total and Price per day";
    insert.className = "insert tertiary-background";

    // Likes
    const portfolioTotalLikes = document.createElement("p");
    portfolioTotalLikes.id = "portfolioTotalLikes";
    portfolioTotalLikes.innerHTML = initialTotalLikes;
    portfolioTotalLikes.ariaLabel = `The total number of likes got by ${name}`;

    const heart = document.createElement("img");
    heart.setAttribute("src", "assets/icons/heart.svg");
    heart.alt = "Icône de likes";
    heart.className = "heart";

    portfolioTotalLikes.appendChild(heart);
    insert.appendChild(portfolioTotalLikes);

    // Price
    const priceText = document.createElement("p");
    priceText.textContent = `${price}€/jour`;
    priceText.ariaLabel = `Price per day to hire ${name}`;

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
