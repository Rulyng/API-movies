const inpMouvie = document.querySelector(".inp-mouvie");
const btnSearch = document.querySelector(".btn-search");
const outResult = document.querySelector(".result");
const prevPageBtn = document.querySelector(".prev");
const nextPageBtn = document.querySelector(".next");
const outSlider = document.querySelector(".swiper-wrapper");
const mainItem = document.querySelector(".main__item");
const wrapper = document.querySelector(".wrapper");


let currentPage = 1;

const currentPageNum = document.querySelector(".current-page");

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

//пошук по імені
btnSearch.addEventListener("click", () => {
  outResult.innerHTML = "";
  currentPage = 1;
  currentPageNum.innerText = currentPage;
  fetch(
    `https://www.omdbapi.com/?s=${inpMouvie.value}&page=${currentPage}&apikey=c51e093c`
  )
    .then((data) => data.json())
    .then((data) => {
      let arr = data.Search;
      console.log(arr);
      arr.forEach((item) => {
        let cartMouvie = creatItem(item);
        outResult.append(cartMouvie);
      });
    })
    .catch((err) => console.log("Error: " + err));
});

//наступна сторінка
nextPageBtn.addEventListener("click", () => {
  outResult.innerHTML = "";
  currentPage++;

  currentPageNum.innerText = currentPage;
  fetch(
    `https://www.omdbapi.com/?s=${inpMouvie.value}&page=${currentPage}&apikey=c51e093c`
  )
    .then((data) => data.json())
    .then((data) => {
      let arr = data.Search;

      //???   умова якщо список фільмів закінчився щоб currentPageNum та currentPage не змінювались????

      // if(arr.length < 10){

      // }
      // console.log(arr);
      arr.forEach((item) => {
        let cartMouvie = creatItem(item);
        outResult.append(cartMouvie);
      });
    })
    .catch((err) => console.log("Error: " + err));
});

//???попередня сторінка
prevPageBtn.addEventListener("click", () => {
  outResult.innerHTML = "";
  currentPage--;
  currentPageNum.innerText = currentPage;

  fetch(
    `https://www.omdbapi.com/?s=${inpMouvie.value}&page=${currentPage}&apikey=c51e093c`
  )
    .then((data) => data.json())
    .then((data) => {
      let arr = data.Search;
      console.log(data);

      //   умова щоб currentPageNum та currentPage не були меньше 1????

      //   if(currentPageNum.innerHTML < 1){
      //     prevPageBtn.setAttribute("disabled", true);
      // }

      // if(currentPageNum.innerHTML >= 1){
      //     prevPageBtn.removeAttribute("disabled", true);
      // }

      arr.forEach((item) => {
        let cartMouvie = creatItem(item);
        outResult.append(cartMouvie);
      });
    })
    .catch((err) => console.log("Error: " + err));
});

//модалка

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

  //з другого кліку  працює модалка
outResult.addEventListener("click", (e) => {
  const modalContent = document.querySelector(".modal-content");
  const mainItemAll = document.querySelectorAll(".main__item");

  for (let i = 0; i < mainItemAll.length; i++) {

    mainItemAll[i].onclick = () => {
      let id = mainItemAll[i].getAttribute("data-id");
      fetch(`https://www.omdbapi.com/?i=${id}&apikey=c51e093c`)
        .then((data) => data.json())
        .then((data) => {
          // console.log(data);
          for (let key in data) {
            modalContent.innerHTML = `
            <h2 class="modal-title"><span>${data.Title}</span> </h2>
      <img class="modal-img" src='${data.Poster}'> 
      <h4 class="modal-country">Country: <span>${data.Country}</span> </h4> 
      <h4 class="modal-actors">Actors: <span>${data.Actors}</span> </h4> 
      <h4 class="modal-dir">Director: <span>${data.Director}</span> </h4> 
      <h4 class="modal-genre">Genre: <span>${data.Genre}</span> </h4> 
      <h4 class="modal-released">Released: <span>${data.Released}</span> </h4> 
      <h4 class="modal-runtime">Runtime: <span>${data.Runtime}</span> </h4> 
      <h4 class="modal-rating">ImdbRating: <span>${data.imdbRating}</span> </h4> 
      `;
          }

          OpenModal() 
        })
        .catch((err) => console.log("Error: " + err));
    };
  }
});


//створюю картку
function creatItem(item) {
  let mainItem = document.createElement("div");
  let mainPoster = document.createElement("img");
  let mainTitle = document.createElement("h4");
  let mainType = document.createElement("h6");
  let mainYear = document.createElement("p");

  mainItem.classList.add("main__item");
  mainPoster.classList.add("main__poster");
  mainTitle.classList.add("main__title");
  mainType.classList.add("main__type");
  mainYear.classList.add("main__data");

  mainPoster.setAttribute("src", item.Poster);
  mainItem.setAttribute("data-id", item.imdbID);
  mainTitle.innerText = item.Title;
  mainType.innerText = item.Type.toUpperCase();
  mainYear.innerText = `Release date: ${item.Year}`;

  mainItem.append(mainPoster, mainTitle, mainType, mainYear);

  return mainItem;
}
