let pokemonId;// declaring new variable pokemonId that stores the id of the pokemon we need to get
const searchButton = document.querySelector('#searchButon');// getting the search field from index
const searchField = document.querySelector('#search');// getting the search button from index
const err404Img = document.querySelector('#err404img');

searchButton.addEventListener('click', async () => { 
  pokemonId = searchField.value || 7;
  err404Img.hidden = true;
  try {
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pHeight = data.height;
    const pName = data.name;
    const pSpriteFront = data.sprites.front_default;
    const pSpriteBack = data.sprites.back_default;
    InsertDataToHtml([pName, pHeight, pSpriteFront, pSpriteBack]);
  } catch (e) {
      console.log("not found!" + e.message);
      err404Img.hidden = false;
  }
  //console.log(`name: ${pName}, height: ${pHeight}, image-url: ${pSpriteFront}`);
  //console.log(data)
});

function InsertDataToHtml(data) {
  let para = document.querySelector('p');
  para.innerText = `Pokemon name: ${data[0]}, Pokemon height: ${data[1]},`;
  let image = document.createElement('img');
  image.src = data[2]
  image.border = '1px';
  image.addEventListener('mouseover', () => image.src = data[3]);
  image.addEventListener('mouseout', () => image.src=data[2]);
  para.append(image);
}
// const searchPokemon = async (pokemonId) => { 
//   const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
//   const pHeight = data.height;
//   const pName = data.name;
//   console.log(`name: ${pName}, height: ${pHeight}`);
//   //console.log(data)
// };

