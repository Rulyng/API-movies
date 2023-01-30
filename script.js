let inpMouvie = document.querySelector('.inp-mouvie');
let btnSearch = document.querySelector('.btn-search');
let outResult = document.querySelector('.result');



                btnSearch.addEventListener ('click', () => {
                outResult.innerHTML = '';
                fetch(`https://www.omdbapi.com/?s=${inpMouvie.value}&apikey=c51e093c`)
                .then(data => data.json()) 
                .then(data => { 
                    let arr = data.Search;
                    console.log(arr); 
                    arr.forEach((item)=>{
                        let cartMouvie = creatItem(item);
                        outResult.append(cartMouvie);
                    })

                }) 
                .catch(err => console.log('Error: ' + err))
                })    

function creatItem(item) {
    let mainItem = document.createElement('div');
    let mainPoster = document.createElement('img');
    let mainTitle = document.createElement('h2');
    let mainType = document.createElement('h6');
    let mainYear = document.createElement('p');

    mainItem.classList.add('main__item');
    mainPoster.classList.add('main__poster');
    mainTitle.classList.add('main__title');
    mainType.classList.add('main__type');
    mainYear.classList.add('main__data');

    mainPoster.setAttribute('src', item.Poster);
    mainTitle.innerText = item.Title;
    mainType.innerText = item.Type.toUpperCase();
    mainYear.innerText = `Release date: ${item.Year}`;

    mainItem.append(mainPoster, mainTitle, mainType, mainYear)

    return mainItem
  }

  