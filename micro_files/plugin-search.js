'use strict';

var searchResults = [];
var pluginData;

function versionCompare(v1, v2, options) {
	var lexicographical = options && options.lexicographical,
		zeroExtend = options && options.zeroExtend,
		v1parts = v1.split('.'),
		v2parts = v2.split('.');

	function isValidPart(x) {
		return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
	}

	if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
		return NaN;
	}

	if (zeroExtend) {
		while (v1parts.length < v2parts.length) v1parts.push("0");
		while (v2parts.length < v1parts.length) v2parts.push("0");
	}

	if (!lexicographical) {
		v1parts = v1parts.map(Number);
		v2parts = v2parts.map(Number);
	}

	for (var i = 0; i < v1parts.length; ++i) {
		if (v2parts.length == i) {
			return 1;
		}

		if (v1parts[i] == v2parts[i]) {
			continue;
		}
		else if (v1parts[i] > v2parts[i]) {
			return 1;
		}
		else {
			return -1;
		}
	}

	if (v1parts.length != v2parts.length) {
		return -1;
	}

	return 0;
}

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

 		function separate_with_commas(tar_array) {
 			let results = "";
 			// Break apart tags with a comma and space
 			for (let i = 0; i < tar_array.length; i++) {
 				results += tar_array[i];
 				if ((i + 1) < tar_array.length) {
 					results += ', ';
 				}
 			}
 			return results;
 		}

	results.forEach(function (item) {
			// The displayed tag(s)
			let display_item_tag = separate_with_commas(item.Tags);
			// The displayed version(s)
			let display_item_allversions = '<p><b>Available versions: </b>';
			// The displayed require(s) list/version(s)
			let display_item_require = '';
			let current_requires = [];
			let requires_len = 0;
			let latestVers = "0.0.0"

			// Handle  multiple versions in repo.json
			for (let i = 0; i < item.Versions.length; i++) {
				// Create a string of all versions other than the newest one
				// Append the versions into a string
				display_item_allversions += item.Versions[i].Version;
				// Save the len so we don't have to recalculate
				requires_len = Object.keys(item.Versions[i].Require).length;
				// Go through each Require obj, turning them to strings, and separate multiples with commas
				for (let x = 0; x < requires_len; x++) {
					// Gets an array of the object's key and value
					current_requires[x] = Object.entries(item.Versions[i].Require)[x];
					// Because of how Micro's repo.json is formatted, there's no space between the [<>=] and the version
					// This adds a space to be more visually appealing
					current_requires[x][1] = current_requires[x][1].match(RegExp('[<>=]+', 'g')) + ' ' + current_requires[x][1].match(RegExp('[^<>=]+', 'g'));
					// NOTE: I believe the require tag will always be 2 values per object - the requirement & the value
					// If that's not right, this'll need to be changed
					current_requires[x] = current_requires[x][0] + ' ' + current_requires[x][1];
					// Instead of running separate_with_commas, do it here to avoid another needless loop
					if ((x + 1) < requires_len) {
						current_requires[x] += ', ';
					}
				}
				// Append the requires into a string
				display_item_require += '</p>\n            <p><b>' + item.Versions[i].Version + ' requires : </b>' + current_requires;
				// If not on the last version, add a comma
				if ((i + 1) < item.Versions.length) {
					display_item_allversions += ', ';
					// Linebreak so we display them below eachother
					display_item_require += '\n';
				}

				if (versionCompare(latestVers, item.Versions[i].Version) < 0) {
					latestVers = item.Versions[i].Version;
				}
			}

			// If there's only a single version, don't show the "All versions: " thing
			if (item.Versions.length == 1) {
				display_item_allversions = '';
			} else {
				// If there are multiple, we close off the paragraph tag we opened in the declaration
				display_item_allversions += '</p>';
			}

		var website = "";
		if (item.Website != undefined) {
			website = '<a href="' + item.Website + '">' + item.Website + '</a><br>';
		}

		table.innerHTML += '<div class="panel panel-default">\n        <div class="panel-heading" role="tab" id="h-' + item.Name + '">\n          <h4 class="panel-title">\n            <a role="button" data-toggle="collapse" data-parent="#results"\n              href="#c-' + item.Name + '" aria-controls="c-' + item.Name + '">\n              ' + item.Name + ' ' + latestVers + '\n            </a>\n          </h4>\n        </div>\n        <div id="c-' + item.Name + '" class="' + collapseStr + '" role="tabpanel" aria-labelledby="h-' + item.Name + '">\n          <div class="panel-body">\n            <p>' + item.Description + '</p>\n' + website + '\n            <p><span class="glyphicon glyphicon-tags" aria-hidden="true"></span> ' + display_item_tag + display_item_allversions + display_item_require + '</p>\n            <p>To install this plugin, run the following command from your CLI</p>\n            <div class="well"$ micro -plugin install ' + item.Name + '</div>\n          </div>\n        </div>\n      </div>';
	});
}
