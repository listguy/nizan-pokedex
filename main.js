let pokemonId;// declaring new variable pokemonId that stores the id of the pokemon we need to get
const searchButton = document.querySelector('#searchButon');// getting the search field from index
const searchField = document.querySelector('#search');// getting the search button from index

searchButton.addEventListener('click', async () => { 
  pokemonId = searchField.value || 7;
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const pHeight = data.height;
  const pName = data.name;
  const pImage = data.sprites.front_default;
  InsertDataToHtml([pName, pHeight, pImage]);
  console.log(`name: ${pName}, height: ${pHeight}, image-url: ${pImage}`);
  //console.log(data)
});

function InsertDataToHtml(data) {
  let para = document.querySelector('p');
  para.innerText = `Pokemon name: ${data[0]}, Pokemon height: ${data[1]},`;
  let image = document.createElement('img');
  image.src = data[2];
  para.append(image);
}
// const searchPokemon = async (pokemonId) => { 
//   const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
//   const pHeight = data.height;
//   const pName = data.name;
//   console.log(`name: ${pName}, height: ${pHeight}`);
//   //console.log(data)
// };

