const inpMouvie = document.querySelector(".inp-mouvie");
const btnSearch = document.querySelector(".btn-search");
const outResult = document.querySelector(".result");
const prevPageBtn = document.querySelector(".prev");
const nextPageBtn = document.querySelector(".next");
const outSlider = document.querySelector(".swiper-wrapper");
const mainItem = document.querySelector(".main__item");
const wrapper = document.querySelector(".wrapper");
const select = document.querySelector(".select");
const currentPageNum = document.querySelector(".current-page");

let currentPage = 1;
let getPages;

// showFirst();
slider();

//slider
function slider() {
  fetch("slider.json")
    .then((data) => data.json())
    .then((data) => {
      data.map((item) => {
        outSlider.innerHTML += `
<div class="swiper-slide">
<img class="swiper-img" src="${item.image}" alt="">
<p class="swiper-title">${item.title}</p>
</div>
    `;
      });
    });
}

//перша сторінка
/* function showFirst() {
  outResult.innerHTML = "";

  fetch(`https://www.omdbapi.com/?s=batman&page=${currentPage}&apikey=c51e093c`)
    .then((data) => data.json())
    .then((data) => {
      let arr = data.Search;
      console.log(data);
      arr.forEach((item) => {
        let cartMouvie = creatItem(item);
        outResult.append(cartMouvie);
      });


    //  здійснює перехід на інші сторінки але додає currentPage +2 враховуючи 71 рядок????
    
    //   nextPageBtn.addEventListener("click", () => {
    //     outResult.innerHTML = "";
    //     currentPage++;
    //     currentPageNum.innerText = currentPage;
    //     console.log(currentPage);
    //     fetch(
    //       `https://www.omdbapi.com/?s=batman&page=${currentPage}&apikey=c51e093c`
    //     )
    //       .then((data) => data.json())
    //       .then((data) => {
    //         let arr1 = data.Search;
    //         console.log(arr1);
    //         arr1.forEach((item) => {
    //           let cartMouvie = creatItem(item);
    //           outResult.append(cartMouvie);
    //         });
    //       });
    //   });
    })
    .catch((err) => console.log("Error: " + err));
} */

//Search name
btnSearch.addEventListener("click", () => {
  outResult.innerHTML = "";
  select.value = "all";
  currentPage = 1;
  currentPageNum.innerText = currentPage;
  if (!inpMouvie.value) {
    alert("Please enter a value in the search input field.");
    inpMouvie.value = "";
    return;
  }
  fetch(
    `https://www.omdbapi.com/?s=${inpMouvie.value}&page=${currentPage}&apikey=c51e093c`
  )
    .then((data) => data.json())
    .then((data) => {
      let numPages = Math.ceil(data.totalResults / 10);
      getPages = numPages;
      if (currentPage === getPages) {
        nextPageBtn.setAttribute("disabled", true);
      }
      if (data.Search.length === 10) {
        nextPageBtn.removeAttribute("disabled");
      }

      let arr = data.Search;
      arr.forEach((item) => {
        console.log(outResult.innerHTML);
        let cartMouvie = creatItem(item);
        outResult.append(cartMouvie);
        mod();
      });

      select.onchange = () => {
        selectChoice(arr);
        mod();
      };
    })
    .catch((err) => console.log("Error: " + err));
});

//next Page  
nextPageBtn.addEventListener("click", () => {
  outResult.innerHTML = "";
  select.value = "all";
  currentPage++;

  currentPageNum.innerText = currentPage;
  fetch(
    `https://www.omdbapi.com/?s=${inpMouvie.value}&page=${currentPage}&apikey=c51e093c`
  )
    .then((data) => data.json())
    .then((data) => {
      if (currentPage === getPages) {
        nextPageBtn.setAttribute("disabled", true);
      }
      if (currentPage > 1) {
        prevPageBtn.removeAttribute("disabled");
      }
      let arr = data.Search;
      arr.forEach((item) => {
        let cartMouvie = creatItem(item);
        outResult.append(cartMouvie);
        mod();
      });
      select.onchange = () => {
        selectChoice(arr);
        mod();
      };
    })
    .catch((err) => console.log("Error: " + err));
});

//prev Page
prevPageBtn.addEventListener("click", () => {
  outResult.innerHTML = "";
  select.value = "all";
  currentPage--;
  currentPageNum.innerText = currentPage;

  fetch(
    `https://www.omdbapi.com/?s=${inpMouvie.value}&page=${currentPage}&apikey=c51e093c`
  )
    .then((data) => data.json())
    .then((data) => {
      if (currentPage <= 1) {
        prevPageBtn.setAttribute("disabled", true);
      }
      if (currentPage !== getPages) {
        nextPageBtn.removeAttribute("disabled");
      }
      let arr = data.Search;
      arr.forEach((item) => {
        let cartMouvie = creatItem(item);
        outResult.append(cartMouvie);
        mod();
      });
      select.onchange = () => {
        selectChoice(arr);
        mod();
      };
    })
    .catch((err) => console.log("Error: " + err));
});

//modal
function OpenModal() {
  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector(".modal");
  const closeBtn = document.querySelector(".modal-close");

  modal.style.display = "flex";
  overlay.style.display = "block";

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
  });
}

//full infa for modal
function mod() {
  const modalContent = document.querySelector(".modal-content");
  const mainBtnAll = document.querySelectorAll(".main__btn");

  for (let i = 0; i < mainBtnAll.length; i++) {
    mainBtnAll[i].onclick = () => {
      let id = mainBtnAll[i].getAttribute("data-id");
      fetch(`https://www.omdbapi.com/?i=${id}&apikey=c51e093c`)
        .then((data) => data.json())
        .then((data) => {
          // console.log(data);
          for (let key in data) {
            modalContent.innerHTML = `
            <h2 class="modal-title"><span>${data.Title}</span> </h2>
            <img class="modal-img" src='${
              data.Poster === "N/A" ? "./img/N.a3..jpg" : data.Poster
            }'> 
            <button class="modal-close">Close</button>
            <h4 class="modal-country">Country: <span>${
              data.Country
            }</span> </h4> 
      <h4 class="modal-actors">Actors: <span>${data.Actors}</span> </h4> 
      <h4 class="modal-dir">Director: <span>${data.Director}</span> </h4> 
      <h4 class="modal-genre">Genre: <span>${data.Genre}</span> </h4> 
      <h4 class="modal-released">Released: <span>${data.Released}</span> </h4> 
      <h4 class="modal-runtime">Runtime: <span>${data.Runtime}</span> </h4> 
      <h4 class="modal-rating">ImdbRating: <span>${
        data.imdbRating
      }</span> </h4> 
      `;
          }

          OpenModal();
        })
        .catch((err) => console.log("Error: " + err));
    };
  }
}

// creat cart

function creatItem(item) {
  let mainItem = document.createElement("div");
  let mainPoster = document.createElement("img");
  let mainTitle = document.createElement("h4");
  let mainYear = document.createElement("p");
  let mainBtn = document.createElement("button");

  mainItem.classList.add("main__item");
  mainPoster.classList.add("main__poster");
  mainTitle.classList.add("main__title");
  mainYear.classList.add("main__data");
  mainBtn.classList.add("main__btn");

  if (item.Poster === "N/A") {
    mainPoster.setAttribute("src", "./img/N.a3..jpg");
  } else {
    mainPoster.setAttribute("src", item.Poster);
  }
  mainBtn.setAttribute("data-id", item.imdbID);
  mainTitle.innerText = item.Title;
  mainYear.innerText = `Release year: ${item.Year}`;
  mainBtn.innerText = `Detail`;

  mainItem.append(mainPoster, mainTitle, mainYear, mainBtn);

  return mainItem;
}

//sort select
function selectChoice(choice) {
  outResult.innerHTML = "";
  choice.filter((item) => {
    if (item.Type == select.value) {
      let cartMouvie = creatItem(item);
      outResult.append(cartMouvie);
    }
    if (select.value == "all") {
      let cartMouvie = creatItem(item);
      outResult.append(cartMouvie);
    }
  });
}
