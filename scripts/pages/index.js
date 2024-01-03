// Imports
import photographerTemplate from "../templates/photographers";
import { getPhotographers } from "../utils/fetchData";

async function buildPhotographersList(photographers) {
  const main = document.querySelector("#main");

  // Section containing the list of photographers
  const photographersSection = document.createElement("section");
  photographersSection.id = "photographer-list";
  photographersSection.ariaLabel = "A list of photographers you can hire.";

  main.appendChild(photographersSection);

  // Build an clickable article for each photographer
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Retrieve data from database
  const { photographers } = await getPhotographers();
  buildPhotographersList(photographers);
}
init();
