let pokemonId;// declaring new variable pokemonId that stores the id of the pokemon we need to get
const searchButton = document.querySelector('#searchButon');// getting the search field from index
const searchField = document.querySelector('#search');// getting the search button from index
const err404Img = document.querySelector('#err404img');

searchButton.addEventListener('click', async () => { 
  pokemonId = searchField.value || 7;
  err404Img.hidden = true;
  try {
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const chars = { // object that contains all the pokemon characteristics
      pName: data.name,
      pHeight: data.height,
      pWeight: data.weight,
      pSpriteFront: data.sprites.front_default,
      pSpriteBack: data.sprites.back_default,
      pTypes: data.types
    };
    InsertDataToHtml(chars);
    // Array.from(chars.pTypes).forEach(type => )
  } catch (e) {
      console.log(e);
      err404Img.hidden = false;
  }
});

function InsertDataToHtml(data) {
  let para = document.querySelector('p');
  console.log(data.pTypes[0].type.name);
  // let types = data.pTypes.reduce((type1, type2) => `${type1} ${type2.type.name},`, '');
  // creating a clickable span tag for every type name
  para.innerText = `Pokemon name: ${data.pName}, Pokemon height: ${data.pHeight}, Pokemon weight: ${data.pWeight}, Pokemon types: `;
  Array.from(data.pTypes).forEach(tObj => {
    let clickableSpan = document.createElement('span');
    clickableSpan.innerText = `${tObj.type.name}, `;
    clickableSpan.addEventListener('click', () =>CreateListOfType(tObj.type.name));
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
async function CreateListOfType(type) {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${type}`); //sends a request to get all pokemons of given type
  document.querySelector('#typeList')? document.querySelector('#typeList').remove() : "";
  let h2 = document.createElement('h2');
  h2.innerText = `${type} Pokemons`;
  let ul = document.createElement('ul');
  data.pokemon.forEach(obj => {
    let li = document.createElement('li');
    li.innerText = obj.pokemon.name;
    ul.append(li);
  })
  let container = document.createElement('div');
  container.id = "typeList";
  container.append(h2, ul);
  document.querySelector('p').append(container);
}

