// Imports
import photographerTemplate from "../templates/photographers";
import { getPhotographers } from "../utils/fetchData";

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer-list");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}
init();
