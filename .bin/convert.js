const fs = require('fs');
const _ = require('./lodash.min.js');
const file = './species.json';
const out = './pokemon.json';

fs.readFile(file, (e, data) => {

  const json = JSON.parse(data);
  const output = json.map(r => {
    return {
      "id": r.national_pokedex_number,
      "name": r.name,
      "types": r.types,
      "baseStats": r.baseStats
    }
  });

  const newOut = _.sortBy(output, ['id', 'name']);
  console.log(newOut);
  const outData = JSON.stringify(newOut);
  fs.writeFileSync(out, outData);

});