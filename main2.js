const searchField = document.querySelector('#search');
const searchButton = document.querySelector('#searchButon');

searchButton.addEventListener('click', async () => {
    const pokemonId = searchField.value;
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const chars = {
        pName: data.name,
        pHeight: data.height,
        pWeight: data.weight,
        pSpriteFront: data.sprites.front_default
    }
    InjectDataToHTML(chars);
    // console.log(`name: ${chars.pName} height: ${chars.pHeight}, weight: ${chars.pWeight}`);
    //console.log(data);
  });

function InjectDataToHTML(chars) {
    const para = document.querySelector('p');
    para.innerText = `name: ${chars.pName}, height: ${chars.pHeight}, weight: ${chars.pWeight}`;
    const image = document.createElement('img');
    image.src = chars.pSpriteFront;
    image.border = '1px';
    para.append(image);
}


  