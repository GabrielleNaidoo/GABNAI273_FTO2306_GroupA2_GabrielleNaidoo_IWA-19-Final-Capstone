import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

if (!books && !Array.isArray(books)) throw new Error("Source required");

/***************ORIGINAL BOOKS DISPLAY************** */
const listItemFragment = document.createDocumentFragment();
const listItemContainer = document.querySelector("[data-list-items]");
const dataListButton = document.querySelector("[data-list-button]");
let currentIndex = 0;
//BOOKS_PER_PAGE=36;//batch size
const displayBooks = () => {
  let endIndex = currentIndex + BOOKS_PER_PAGE;
  let booksToShow = books.slice(currentIndex, endIndex);
  for (let i = 0; i < booksToShow.length; i++) {
    const { title, image, author, id } = booksToShow[i];
    const element = document.createElement("div");
    element.classList.add("preview");
    element.setAttribute("data-preview", id);

    element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />

            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

    listItemFragment.appendChild(element);
  }
  listItemContainer.appendChild(listItemFragment);

  currentIndex = endIndex;

  if (currentIndex >= books.length) {
    dataListButton.disabled = true;
  } else {
    const booksLeft = books.length - currentIndex;
    dataListButton.textContent = `Show more ${booksLeft}`;
  }
};

displayBooks();

dataListButton.addEventListener("click", displayBooks);

/********************CLICK EVENT ON LIST ITEMS-SHOWS OVERLAY************* */
const overlayContainer = document.querySelector("[data-list-active]");
const overlayBlur = overlayContainer.querySelector("[data-list-blur]");
const overlayImage = overlayContainer.querySelector("[data-list-image]");
const overlayTitle = overlayContainer.querySelector("[data-list-title]");
const overlaySubtitle = overlayContainer.querySelector("[data-list-subtitle]");
const overlayDescription = overlayContainer.querySelector(
  "[data-list-description]"
);
const overlayClose = overlayContainer.querySelector("[data-list-close]");

listItemContainer.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("preview")) {
    for (let i = 0; i < books.length; i++) {
      const { title, image, author, id, published } = books[i];
      if (id === target.dataset.preview) {
        overlayContainer.style.display = "block";

        overlayBlur.src = image;
        overlayImage.src = image;
        overlayTitle.textContent = title;
        overlaySubtitle.textContent = `${authors[author]} (${new Date(
          published
        ).getFullYear()})`;

        let descriptionFromId = "";

        for (let j = 0; j < books.length; j++) {
          if (target.dataset.preview === books[j].id) {
            descriptionFromId = books[j].description;
            break;
          }
        }
        overlayDescription.textContent = descriptionFromId;
      }
    }
  }
});

overlayClose.addEventListener(
  "click",
  (event) => (overlayContainer.style.display = "none")
);

/*******************SEARCH FORM DROPDOWNS************** */

//Genres:
const searchGenres = document.querySelector("[data-search-genres]");

const allGenres = document.createElement("option");
allGenres.value = "any";
allGenres.textContent = "All Genres";
searchGenres.appendChild(allGenres);

const genresFragment = document.createDocumentFragment();

for (const id of Object.keys(genres)) {
  const genreName = genres[id];
  const element = document.createElement("option");
  element.value = genreName;
  element.textContent = genreName;
  genresFragment.appendChild(element);
}

searchGenres.appendChild(genresFragment);

//Authors:

const searchAuthors = document.querySelector("[data-search-authors]");

const allAuthors = document.createElement("option");
allAuthors.value = "any";
allAuthors.textContent = "All Authors";
searchAuthors.appendChild(allAuthors);

const authorsFragment = document.createDocumentFragment();

for (const id of Object.keys(authors)) {
  const authorName = authors[id];
  const element = document.createElement("option");
  element.value = authorName;
  element.textContent = authorName;
  authorsFragment.appendChild(element);
}

searchAuthors.appendChild(authorsFragment);

/*******************************CLICK EVENTS*************************** */

//SEARCH OVERLAY

const searchButton = document.querySelector("[data-header-search]");
const searchOverlay = document.querySelector(["[data-search-overlay]"]);
const closeSearch = document.querySelector("[data-search-cancel]");
const searchSubmit = searchOverlay.querySelector(".overlay__button_primary");
const searchListMessage = document.querySelector("[data-list-message]");

searchButton.addEventListener("click", (event) => {
  searchOverlay.style.display = "block";
  searchOverlay.querySelector("[data-search-title]").focus();
});

closeSearch.addEventListener(
  "click",
  (event) => (searchOverlay.style.display = "none")
);

//Search submit --filters
const formElement = document.querySelector("[data-search-form]");

searchSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  const titleInput = document
    .querySelector("[data-search-title]")
    .value.trim()
    .toLowerCase();
  const genreInput = document.querySelector("[data-search-genres]").value;
  const authorInput = document.querySelector("[data-search-authors]").value;
  // listItemContainer.innerHTML = "";
  let result = [];

  for (let i = 0; i < books.length; i++) {
    const { author, title } = books[i];
    const authorName = authors[author];
    let genreMatch = false;
    for (let j = 0; j < books[i].genres.length; j++) {
      const genreID = books[i].genres[j];
      const genreName = genres[genreID];

      if (genreName && genreName === genreInput) {
        genreMatch = true;
        break;
      }
    }
    if (
      (title.toLowerCase().includes(titleInput) || titleInput === "") &&
      (authorInput === authorName || authorInput === "any") &&
      (genreMatch || genreInput === "any")
    ) {
      if (!result.includes(books[i])) {
        result.push(books[i]);
      }
    }
  }
  console.log(result);

  searchOverlay.style.display = "none";

  if (result.length === 0) {
    listItemContainer.innerHTML = "";
    searchListMessage.style.display = "block";
    dataListButton.style.display = "none";
  }
  if (result.length > 0 && result.length !== books.length) {
    searchListMessage.style.display = "none"; //Gets rid of message form narrow search
    const resultItemFragment = document.createDocumentFragment(); //create fragment to append the result items from result array
    listItemContainer.innerHTML = "";
    let currentIndex = 0;

    const displayBookResult = () => {
      let endIndex = currentIndex + BOOKS_PER_PAGE;
      let resultsToShow = result.slice(currentIndex, endIndex);
      for (let i = 0; i < resultsToShow.length; i++) {
        const { title, image, author, id } = resultsToShow[i];
        const resultElement = document.createElement("div");
        resultElement.classList.add("preview");
        resultElement.setAttribute("data-preview", id);

        resultElement.innerHTML = /* html */ `
              <img
                  class="preview__image"
                  src="${image}"
              />
  
              <div class="preview__info">
                  <h3 class="preview__title">${title}</h3>
                  <div class="preview__author">${authors[author]}</div>
              </div>
          `;

        resultItemFragment.appendChild(resultElement);
      }
      listItemContainer.appendChild(resultItemFragment);

      currentIndex = endIndex;

      if (currentIndex >= resultsToShow.length) {
        dataListButton.disabled = true;
      } else {
        const resultsLeft = resultsToShow.length - currentIndex;
        dataListButton.textContent = `Show more ${resultsLeft}`;
      }
    };
    displayBookResult();
    dataListButton.removeEventListener("click", displayBooks);
    dataListButton.addEventListener("click", displayBookResult);
  }
  if (result.length === books.length) {
    dataListButton.disabled = false;
  }
});

//SETTINGS OVERLAY

const settingsButton = document.querySelector("[data-header-settings]");
const settingsOverlay = document.querySelector("[data-settings-overlay]");
const closeSettings = document.querySelector("[data-settings-cancel]");

const settingsSave = settingsOverlay.querySelector(".overlay__button_primary");

settingsButton.addEventListener(
  "click",
  (event) => (settingsOverlay.style.display = "block")
);

closeSettings.addEventListener(
  "click",
  (event) => (settingsOverlay.style.display = "none")
);

const day = {
  dark: "10, 10, 20",
  light: "255, 255, 255",
};

const night = {
  dark: "255, 255, 255",
  light: "10, 10, 20",
};

settingsSave.addEventListener("click", (event) => {
  event.preventDefault();
  const settingsValue = document.querySelector("[data-settings-theme]").value;
  const backdrop = document.querySelector(".backdrop");

  if (settingsValue === "day") {
    document.documentElement.style.setProperty("--color-dark", day.dark);
    document.documentElement.style.setProperty("--color-light", day.light);
    settingsOverlay.style.display = "none";
  }

  if (settingsValue === "night") {
    document.documentElement.style.setProperty("--color-dark", night.dark);
    document.documentElement.style.setProperty("--color-light", night.light);
    settingsOverlay.style.display = "none";
  }
});
