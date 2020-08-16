let pokemonId;// declaring new variable pokemonId that stores the id of the pokemon we need to get
const searchButton = document.querySelector('#searchButon');// getting the search field from index
const searchField = document.querySelector('#search');// getting the search button from index
const err404Img = document.querySelector('#err404img');

searchButton.addEventListener('click',  () => { 
  pokemonId = searchField.value || 7;
  err404Img.hidden = true;
  updatePreviewPokemon(pokemonId)
});

// gets and updates pokemon data from api to html the page
// Axios solution
// async function updatePreviewPokemon(pID) {
//   try {
//     const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pID}`);
//     const chars = { // object that contains all the pokemon characteristics
//       pName: data.name,
//       pHeight: data.height,
//       pWeight: data.weight,
//       pSpriteFront: data.sprites.front_default,
//       pSpriteBack: data.sprites.back_default,
//       pTypes: data.types
//     };
//     insertDataToHtml(chars);
//   } catch (e) {
//       console.log(e);
//       err404Img.hidden = false;
//   }

// }

// Fetch Solution
function updatePreviewPokemon(pID) {
  fetch(`http://pokeapi.co/api/v2/pokemon/${pID}`)
  .then(res => res.json())
  .then(data => { const chars = { // object that contains all the pokemon characteristics
    pName: data.name,
    pHeight: data.height,
    pWeight: data.weight,
    pSpriteFront: data.sprites.front_default,
    pSpriteBack: data.sprites.back_default,
    pTypes: data.types
  };
  insertDataToHtml(chars);})
  .catch (e => {
    console.log(e);
    err404Img.hidden = false;
  });

}

// inserts pokemon data to index page
function insertDataToHtml(data) {
  let para = document.querySelector('p');
  console.log(data.pTypes[0].type.name);

  // creating a clickable span tag for every type name
  para.innerText = `Pokemon name: ${data.pName}, Pokemon height: ${data.pHeight}, Pokemon weight: ${data.pWeight}, Pokemon types: `;
  Array.from(data.pTypes).forEach(tObj => {
    let clickableSpan = document.createElement('span');
    clickableSpan.innerText = `${tObj.type.name}, `;
    clickableSpan.addEventListener('click', () =>createListOfType(tObj.type.name));
    para.append(clickableSpan);
  });
  let image = document.createElement('img');
  image.src = data.pSpriteFront;
  image.border = '1px';
  image.addEventListener('mouseover', () => image.src = data.pSpriteBack);
  image.addEventListener('mouseout', () => image.src = data.pSpriteFront);
  para.append(image);
}

// creates a list consisting all pokemon of given type
async function createListOfType(type) {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);// sends a request to get all pokemons of given type
  document.querySelector('#typeList')? document.querySelector('#typeList').remove() : "";
  let h2 = document.createElement('h2');
  h2.innerText = `${type} Pokemons`;
  let ul = document.createElement('ul');
  data.pokemon.forEach(obj => {
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.innerText = obj.pokemon.name;
    // adding an event listener for each pokemon in the list to preview his data when it's name is clicked
    span.addEventListener('click', (e) => updatePreviewPokemon(e.target.innerText));
    li.append(span);
    ul.append(li);
  })
  let container = document.createElement('div');
  container.id = "typeList";
  container.append(h2, ul);
  document.querySelector('p').append(container);
}

