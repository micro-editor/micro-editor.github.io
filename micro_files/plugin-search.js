'use strict';

var searchResults = [];
var pluginData;

function fetchData() {
    fetch('https://raw.githubusercontent.com/micro-editor/plugin-channel/master/channel.json').then(function (response) {
        return response.text().then(function (text) {
            // Remove Comments
            var rawdata = text.replace(/[/s][\/]\B.+/g, "");
            console.log(rawdata);
            // Parse Data
            var channel = JSON.parse(rawdata);
            pluginData = [];
            channel.forEach(function (item) {
                fetch(item).then(function (response) {
                    return response.json().then(function (json) {
                        pluginData.push(json[0]);
                        console.log(json[0]);
                        search(true);
                    });
                });
            });
        });
});
}

function search(collapse) {
    switch (document.querySelector('input[name="searchby"]:checked').value) {
        case 'Name':
            console.log('Search by Name');
            searchResults = pluginData.filter(function (item) {
                return item.Name.includes(document.getElementById('keyword').value);
            });
            console.log(searchResults);
            showResults(searchResults, collapse);
            break;
        case 'Description':
            console.log('Search by Description');
            searchResults = pluginData.filter(function (item) {
                return item.Description.includes(document.getElementById('keyword').value);
            });
            console.log(searchResults);
            showResults(searchResults, collapse);
            break;
        case 'Tags':
            console.log('Search by Tags');
            searchResults = pluginData.filter(function (item) {
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
    results.forEach(function (item) {
        table.innerHTML += '<div class="panel panel-default">\n        <div class="panel-heading" role="tab" id="h-' + item.Name + '">\n          <h4 class="panel-title">\n            <a role="button" data-toggle="collapse" data-parent="#results"\n              href="#c-' + item.Name + '" aria-controls="c-' + item.Name + '">\n              ' + item.Name + ' ' + item.Versions[0].Version + '\n            </a>\n          </h4>\n        </div>\n        <div id="c-' + item.Name + '" class="' + collapseStr + '" role="tabpanel" aria-labelledby="h-' + item.Name + '">\n          <div class="panel-body">\n            <p>' + item.Description + '</p>\n            <p><span class="glyphicon glyphicon-tags" aria-hidden="true"></span> ' + item.Tags.toString() + '<p>\n            <p><b>Require : </b>' + JSON.stringify(item.Versions[0].Require) + '</p>\n            <p>To install this plugin, open micro from your CLI,\n            press [Crtl + E] then run the command line below.\n            Once you are done, restart micro.</p>\n            <div class="well">&gt; plugin install ' + item.Name + '</div>\n          </div>\n        </div>\n      </div>';
    });
}
