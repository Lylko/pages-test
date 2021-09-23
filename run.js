import fetch from "node-fetch";
import fs from "fs";

function run() {

  console.log("Generation started...");

  const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const parameters = {
      url: encodeURIComponent(`https://cars.av.by`)
  };


  console.log("Forming a request...");
  let query = `${api}?`;
  for (var key in parameters) {
  query += `${key}=${parameters[key]}`;
  }

  // Add API key at the end of the query
  console.log("Adding API key at the end of the query...");
  const apiKey = fs.readFileSync('key/api.key', 'utf-8');
  const url = query + "&key=" + apiKey + "";

  console.log("Receiving a response...");
  fetch(url)
  .then(response => response.json())
  .then(json => {
      generate(json)
  });
}

function generate(json){
  console.log("Preparing of report...");
  fs.writeFile('reports/report' + new Date().getTime() + '.json', JSON.stringify(json, null, 3), (error) => {
    if (error) {
        console.error(`Can not generate report: ${error.message}`);
    }
  });
  console.log("The report has been successfully created!");
}


run();