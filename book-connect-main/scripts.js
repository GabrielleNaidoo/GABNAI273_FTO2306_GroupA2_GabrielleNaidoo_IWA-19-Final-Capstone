import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

const matches = [];
let page = 1;

// if (!books && !Array.isArray(books)) throw new Error('Source required')
// if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

let fragment = document.createDocumentFragment();
const extracted = books.slice(0, BOOKS_PER_PAGE + 1);

/************SHOW ALL BOOKS*********** */
const listItemFragment = document.createDocumentFragment();
const listItemContainer = document.querySelector("[data-list-items]");

for (let i = 0; i < books.length; i++) {
  const { title, image, author, id } = books[i];

  //List items:
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

/********************PREVIEW OVERLAYS******************** */

// const previewFragment = document.createDocumentFragment();

// for (let i = 0; i < books.length; i++) {
//   //overlays for list items:
//   const { title, image, author, id } = books[i];

//
//   }
//   const previewImagesElement = document.createElement("div");
//   previewImagesElement.classList.add("overlay__preview");
//   previewImagesElement.innerHTML = /*html*/ `
//   <img class="overlay__blur" data-list-blur src="${image}"/>
//       <img class="overlay__image" data-list-image src="${image}"/>`;

//   const previewContentElement = document.createElement("div");
//   previewContentElement.classList.add("overlay__content");
//   previewContentElement.innerHTML = /*html */ `<h3 class="overlay__title" data-list-title>${title}</h3>
//   <div class="overlay__data" data-list-subtitle>${authors[author]}</div>
//   <p class="overlay__data overlay__data_secondary" data-list-description>${descriptionFromId}</p>`;

//   const previewCloseElement = document.createElement("div");
//   previewCloseElement.classList.add("overlay__row");
//   previewCloseElement.innerHTML = /*html*/ `
//   <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
//   `;

//   previewFragment.appendChild(previewImagesElement);

//   previewFragment.appendChild(previewContentElement);
//   previewFragment.appendChild(previewCloseElement);
// }
// overlayContainer.appendChild(previewFragment);

/********************CLICK EVENT ON LIST ITEMS************* */
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
      const { title, image, author, id } = books[i];
      if (id === target.dataset.preview) {
        overlayContainer.style.display = "block";

        overlayBlur.src = image;
        overlayImage.src = image;
        overlayTitle.textContent = title;
        overlaySubtitle.textContent = authors[author];

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

/********************************* /******************LIST ITEMS**************** */

//-Loop over books array to create the list items that show up for each book.
//-must contain image
//-must contain title of book
//-must contain author
//-try using the appendChild method on a fragment*/

/****************************** */

const dataListButton = document.querySelector("[data-list-button]");
dataListButton.textContent = `Show more ${books.length - BOOKS_PER_PAGE}`;

// data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

// document.dataset.listButton.innerHTML = /* html */ [
//   "<span>Show more</span>",
//   '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
// ];

// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

// data-list-button.click() {
//     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
//     actions.list.updateRemaining()
//     page = page + 1
// }

// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//         //     genreMatch = filters.genre = 'any'
//         //     for (genre; book.genres; i++) { if singleGenre === filters.genre { genreMatch === true }}}
//         // }

//     //     if titleMatch && authorMatch && genreMatch => result.push(book)
//     // }

//     // if display.length < 1
//     // data-list-message.class.add('list__message_show')
//     // else data-list-message.class.remove('list__message_show')

//     dataset.listItems.innerHTML = '';
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1])

//     for (let i={ author, image, title, id }; i<extracted.length; i++) {
//         const { author: authorId, id, image, title } = props

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />

//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }

//     data-list-items.appendChild(fragments)

//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     // data-list-button.disabled = initial > 0

//     // data-list-button.innerHTML = /* html */ `
//     //     <span>Show more</span>
//     //     <span class="list__remaining"> (${remaining})</span>
//     // `

// window.scrollTo({ top: 0, behavior: "smooth" });
//     // data-search-overlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)

//     // data-settings-overlay).open === false
// }

// // data-list-items.click() {
// //     pathArray = Array.from(event.path || event.composedPath())
// //     active;

// //     for (node; pathArray; i++) {
// //         if active break;
// //         const previewId = node?.dataset?.preview

// //         for (const singleBook of books) {
// //             if (singleBook.id === id) active = singleBook
// //         }
// //     }

//     // if !active return
//     // data-list-active.open === true
//     // data-list-blur + data-list-image === active.image
//     // data-list-title === active.title

//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description
// }

/********************CLICK EVENTS******************** */

//SEARCH OVERLAY

const searchButton = document.querySelector("[data-header-search]");
const searchOverlay = document.querySelector(["[data-search-overlay]"]);
const closeSearch = document.querySelector("[data-search-cancel]");

searchButton.addEventListener("click", (event) => {
  searchOverlay.style.display = "block";
  searchOverlay.querySelector("[data-search-title]").focus();
});

closeSearch.addEventListener(
  "click",
  (event) => (searchOverlay.style.display = "none")
);

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

  //Does the users inputted value match the user's preference of preferring dark?
  // settingsValue === window.matchMedia &&
  // window.matchMedia("(prefers-color-scheme: dark)").matches
  //   ? "night"
  //   : "day";
});

// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);

//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);

//day mode styles
/*const day = {
  dark: "10, 10, 20", //text
  light: "255, 255, 255",//background
};


//night mode styles
const night = {
  dark: "255, 255, 255",//background
  light: "10, 10, 20",//text
};*/
