async function getPhotographers() {
  const res = await fetch("../../data/photographers.json");
  const data = await res.json();

  return data;
}

async function getPhotographer(id) {
  const { photographers, media } = await getPhotographers();

  const photographer = photographers.find((p) => p.id === id);
  const photographerMedia = media.filter((m) => m.photographerId === id);

  const profile = {
    photographer,
    media: photographerMedia,
  };

  return profile;
}

export { getPhotographers, getPhotographer };
