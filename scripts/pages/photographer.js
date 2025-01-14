// Imports
import { getPhotographer } from "../utils/fetchData";
import photographerPageTemplate from "../templates/photographer";

async function displayData(data) {
  const main = document.querySelector("main");

  const photographerPageUIBuilder = photographerPageTemplate(data);

  // Header
  const photographerHeader =
    photographerPageUIBuilder.photographerHeaderTemplate();
  main.appendChild(photographerHeader);

  // Portfolio
  const photographerPortfolio =
    photographerPageUIBuilder.photographerPortfolioTemplate();
  main.appendChild(photographerPortfolio);

  // Insert
  const body = document.querySelector("body");
  const photographerInsert =
    photographerPageUIBuilder.photographerPriceAndTotalLikesTemplate();
  body.appendChild(photographerInsert);
}

async function init() {
  // Récupère l'id du/de la photographe
  const search = window.location.search;
  const id = Number(search.split("?id=")[1]);

  if (id) {
    // Récupère les informations du/de la photographe
    const data = await getPhotographer(id);
    displayData(data);
  } else {
    window.location.replace("/");
  }
}
init();
