import '/web_modules/bootstrap.js';
import '/web_modules/github-buttons.js';
import '/web_modules/whatwg-fetch.js';
import html from '/web_modules/nanohtml/lib/browser.js';
import pMap from '/web_modules/p-map.js';
import semverRCompare from '/web_modules/semver/functions/rcompare.js';
import stripJsonComments from '/web_modules/strip-json-comments.js';

const PLUGINS_CHANNEL_URL = 'https://raw.githubusercontent.com/micro-editor/plugin-channel/master/channel.json';

const reRequires = /([<>]=?)\s*([^\s])/g;

const pluginRows = new Map();
const pluginsTable = document.getElementById('results');
const searchForm = document.getElementsByTagName('form').item(0);

const searchConditions = {
  Name: (plugin, query) => plugin.Name.includes(query),
  Description: (plugin, query) => plugin.Description.includes(query),
  Tags: (plugin, query) => plugin.Tags.includes(query)
};

const castArray = arg => Array.isArray(arg) ? arg : [arg];
const cond = (condition, value) => condition ? value : null;

const template = ({ name, description, versions, website, tags, collapsed }) => html`
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="h-${name}">
      <h4 class="panel-title">
        <a
          role="button"
          data-toggle="collapse"
          data-parent="#results"
          aria-controls="c-${name}"
          href="#c-${name}"
          target="_blank">
          ${name} ${versions[0].Version}
        </a>
      </h4>
    </div>
    <div
      id="c-${name}"
      class="panel-collapse collapse ${!collapsed ? 'in' : ''}"
      role="tabpanel"
      aria-labelledby="h-${name}">
      <div class="panel-body">
        <p>${description}</p>
        ${cond(website, html`
          <p><a href="${website}">${website}</a></p>
        `)}
        ${cond(tags.length > 0, html`
          <p>
            <span class="glyphicon glyphicon-tags" aria-hidden="true"></span>
            ${tags.join(', ')}
          </p>
        `)}
        ${cond(versions.length > 1, html`
          <p>
            <strong>Available versions:</strong>
            ${formatVersions(versions)}
          </p>
        `)}
        ${versions.map(version => html`
          <p>
            <strong>${version.Version} requires:</strong>
            ${formatRequires(version.Require)}
          </p>
        `)}
        <p>To install this plugin, run the following command from your CLI</p>
        <div class="well"><code>$ micro -plugin install ${name}</code></div>
      </div>
    </div>
  </div>
`;

(async function () {
  const plugins = await fetchPlugins();
  renderPlugins(plugins);
  searchForm.addEventListener('submit', onSearch);
}());

async function fetchPlugins () {
  const channel = await fetchJson(PLUGINS_CHANNEL_URL);
  const repos = await pMap(channel, async url => {
    const repo = castArray(await fetchJson(url));
    return repo.map(plugin => {
      plugin.Versions.sort((a, b) => semverRCompare(a.Version, b.Version));
      return plugin;
    });
  });
  return repos.flat();
}

function onSearch (e) {
  const data = new FormData(searchForm);
  const query = data.get('keyword').trim();
  const type = data.get('searchby');
  showResults({ query, type });
  e.preventDefault();
}

function showResults ({ query, type }) {
  if (!query) {
    pluginRows.forEach(row => {
      toggleElement(row, true);
      togglePanelState(row, { expand: false });
    });
    return;
  }
  const cond = searchConditions[type] || searchConditions.Name;
  pluginRows.forEach((row, plugin) => {
    toggleElement(row, cond(plugin, query));
    togglePanelState(row, { expand: true });
  });
}

function renderPlugins (plugins, collapsed = true) {
  pluginsTable.innerHTML = '';
  return plugins.map(it => {
    const row = template({
      name: it.Name,
      description: it.Description,
      tags: it.Tags,
      website: it.Website,
      versions: it.Versions,
      collapsed
    });
    pluginRows.set(it, row);
    return pluginsTable.appendChild(row);
  });
}

function formatVersions (versions) {
  return versions.map(it => it.Version).join(', ');
}

function formatRequires (requires) {
  return Object.entries(requires).map(([key, value]) => {
    /**
     * Because of how Micro's repo.json is formatted, there's no space between
     * the [<>]= and the version. This adds a space to be more visually appealing.
     */
    value = value.replace(reRequires, '$1 $2').trim();
    return `${key} ${value}`;
  }).join(', ');
}

function toggleElement (el, state) {
  el.style.display = state ? 'block' : 'none';
}

function togglePanelState (el, { expand = false }) {
  const tabpanel = el.querySelector('[role="tabpanel"]');
  tabpanel && tabpanel.classList.toggle('in', expand);
}

async function fetchJson (url) {
  const resp = await fetch(url);
  const json = await resp.text();
  return JSON.parse(stripJsonComments(json));
}
