let searchResults = [];
let pluginData;

function fetchData(){
  fetch('https://raw.githubusercontent.com/micro-editor/plugin-channel/master/channel.json')
  .then(response=>response.text()
    .then(text=>{
      // Remove Comments
      let rawdata = text.replace(/[/s][\/]\B.+/g, "");
      console.log(rawdata);
      // Parse Data
      const channel = JSON.parse(rawdata);
      pluginData = [];
      channel.forEach(item=>{
        fetch(item)
        .then(response=>response.json()
          .then(json=>{
            pluginData.push(json[0]);
            console.log(json[0]);
            search(true)
          }));
      });
    })
  );
}

function search(collapse){
  switch(document.querySelector('input[name="searchby"]:checked').value){
    case 'Name':
      console.log('Search by Name');
      searchResults = pluginData.filter(item=>{
        return item.Name.includes(document.getElementById('keyword').value);
      });
      console.log(searchResults);
      showResults(searchResults, collapse);
      break;
    case 'Description':
      console.log('Search by Description');
      searchResults = pluginData.filter(item=>{
        return item.Description.includes(document.getElementById('keyword').value);
      });
      console.log(searchResults);
      showResults(searchResults, collapse);
      break;
    case 'Tags':
      console.log('Search by Tags');
      searchResults = pluginData.filter(item=>{
        return item.Tags.includes(document.getElementById('keyword').value);
      });
      console.log(searchResults);
      showResults(searchResults, collapse);
      break;
  }
}

function showResults(results, collapsed) {
  var table = document.getElementById('results');
  table.innerHTML = '';
  var collapseStr = "panel-collapse collapse";
  if (!collapsed) {
    collapseStr += " in";
  }
  results.forEach(item=>{
    table.innerHTML +=
      `<div class="panel panel-default">
        <div class="panel-heading" role="tab" id="h-${item.Name}">
          <h4 class="panel-title">
            <a role="button" data-toggle="collapse" data-parent="#results"
              href="#c-${item.Name}" aria-controls="c-${item.Name}">
              ${item.Name} ${item.Versions[0].Version}
            </a>
          </h4>
        </div>
        <div id="c-${item.Name}" class="${collapseStr}" role="tabpanel" aria-labelledby="h-${item.Name}">
          <div class="panel-body">
            <p>${item.Description}</p>
            <p><span class="glyphicon glyphicon-tags" aria-hidden="true"></span> ${item.Tags.toString()}<p>
            <p><b>Require : </b>${JSON.stringify(item.Versions[0].Require)}</p>
            <p>To install this plugin, open micro from your CLI,
            press [Crtl + E] then run the command line below.
            Once you are done, restart micro.</p>
            <div class="well">&gt; plugin install ${item.Name}</div>
          </div>
        </div>
      </div>`;
  });
}
