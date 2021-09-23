import fetch from "node-fetch";
import fs from "fs";

function run() {

  const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const parameters = {
      url: encodeURIComponent(`https://cars.av.by`)
  };

  let query = `${api}?`;
  for (var key in parameters) {
  query += `${key}=${parameters[key]}`;
  }

  // Add API key at the end of the query
  const apiKey = process.env.CRYPTO_KEY || fs.readFileSync('key/api.key', 'utf-8');
  const url = query + "&key=" + apiKey + "";

  fetch(url)
  .then(response => response.json())
  .then(json => {
      generate(json)
  });
}

function generate(json){
  fs.writeFile('reports/report' + new Date().getTime() + '.json', JSON.stringify(json, null, 3), (error) => {
    if (error) {
        console.error(`Can not generate report: ${error.message}`);
    }
});
}


run();