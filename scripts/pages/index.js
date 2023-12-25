// Imports
import photographerTemplate from "../templates/photographers";

async function getPhotographers() {
  const res = await fetch("../../data/photographers.json");
  const data = await res.json();

  return data;
}

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
