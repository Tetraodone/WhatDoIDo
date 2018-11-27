function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://maps.googleapis.com/maps/api/js?key=' +
      '&key=' + config.mapsKey; //& needed
  document.body.appendChild(script);
}
window.onload = loadScript;
