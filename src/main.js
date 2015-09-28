/*global io*/ 
/*global React*/ 
var App      = require('./components/app');  

var settings = JSON.parse(document.getElementById('settings').innerHTML); 
React.render(<App title="Social Radar" settings={settings}/>, document.body);