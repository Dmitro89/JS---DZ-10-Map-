function initMap() {
  
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
 
  var map;
  var chernihiv = new google.maps.LatLng (51.4944836, 31.2930315);

  var mapOptions = {
    center: chernihiv,
    zoom: 12,
    mapTypeControl: false
  }

  map = new google.maps.Map(document.getElementById('map-search'), mapOptions);

  directionsDisplay.setMap(map);
  directionsDisplay.setOptions( { suppressMarkers: true, suppressInfoWindows: true } );

  $('select').on('change', function(){
    var val = $(this).val();   
    var pos = eval(val);
    //console.log(pos);
    map.panTo(pos);
  });


  function calculateRoute(che, endpoint){
   
    var request = {
      origin: chernihiv,
      destination:  endpoint,
      travelMode: google.maps.TravelMode.DRIVING
    };
    
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });
  }
  
  document.getElementById('end').onclick = function(event){
    event.preventDefault();
    calculateRoute($('input[name=che]').val(), $('input[name=endpoint]').val());
  };
};

$(document).ready(function(){
  initMap();
});   
