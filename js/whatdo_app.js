
var app = angular.module("Whatdo",[]);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.controller('mController', function($scope, $interval, $http) {
    $scope.title = 'What do I do today?'
    $scope.adhocActivities = ['Go for a walk!', 'Have a picnic!', 'Draw something!'];
    //Required Vars
    $scope._data = null;
    $scope.activity;
    $scope.last = '';
    $scope.onlineStatus = true;
    $scope.myLocation=null;

    $scope.newActivity = function(obj){
      this.name = obj.name;
      this.longLocation = obj.location_summary;
      this.startTime = obj.datetime_start
      this.pointLocation = obj.point
      this.keyWords = function(){
        //Return keywords for user to dislike / dislike
        //avoid returning location_slug
        //TODO
      }
    }

    $scope.findAdHocActivity = function(){
      //generate ad-hoc activity from list
      var activityName;
      //loop to avoid same activity
      do{
        activityName = $scope.adhocActivities[Math.floor(Math.random() * $scope.adhocActivities.length)];
      } while (activityName === $scope.last)

      var activityObj = function(_name, _location = false){
        this.name = _name;
        this.longLocation = '';
        this.startTime = '';
        this.allowLocation = _location;
        this.point = '';
      }
      $scope.activity = new activityObj(activityName);
      $scope.last = $scope.activity.name;
    }

    $scope.findEventActivity = function(){
      //fetch function / event activity from eventfinda api
      $('.loader').show();
      if ($scope._data===null){
        do{
          //wait
        }while($scope.myLocation===null)
        var url = "./php/getData.php?lat=";
        url += $scope.myLocation.coords.latitude + '&long=' + $scope.myLocation.coords.longitude;

        $http.get(url).then(
          function(response){
            this.parseEvent(response)
          }, function(err) {
              $('.alert').html('Bad / No data received from server. Check your connection or EventFinda may be down. Results shown are ad-hoc offline activity suggestions. Re-toggle planned activities to try again.');
              $('.alert').show('0.3s')
              setTimeout(function(){
                $('.alert').hide('0.3s')
              }, 5000)
              $('.loader').hide();
              $scope.findAdHocActivity();
              $scope.onlineStatus = false;
          })

        parseEvent = function(_data) {
          $scope._data = _data;
          var events = _data.data.events;
          activity = events[Math.floor(Math.random() * events.length)];
          $scope.activity = new $scope.newActivity(activity);
          $scope.result = activity.name + ' at ' + activity.location_summary + " starting at " + activity.datetime_start;
          $scope.initMap(activity.point.lat, activity.point.lng)
          $('.loader').hide();
        }
      } else {
        console.log('yay! didnt touch')
        var events = $scope._data.data.events;
        activity = events[Math.floor(Math.random() * events.length)];
        console.log(activity.name)
        $scope.activity = new $scope.newActivity(activity);
        $scope.result = activity.name + ' at ' + activity.location_summary + " starting at " + activity.datetime_start;
        $scope.initMap(activity.point.lat, activity.point.lng)
        $('.loader').hide();
      }
    }

    $scope.displayActivity = function(){
      if($scope.eventCheckBox && $scope.onlineStatus){
        var random_boolean = Math.random() >= 0.5;
        if(random_boolean){
          $scope.findEventActivity();
        } else {
          $scope.findAdHocActivity();
        }
      } else {
        $scope.findAdHocActivity();
      }
    }

    $scope.getLocation = function() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(pos){
            console.log(pos)
            $scope.myLocation = pos;
          });
      } else {
          //x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }

    $scope.initMap = function(_lat = -36.848448, _lng = 174.762191){
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: _lat, lng: _lng},
        zoom: 15,
        styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "stylers": [
      {
        "color": "#e2e7d6"
      }
    ]
  },
  {
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#d3d7e2"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c3c2ce"
      },
      {
        "weight": 1
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#aec5c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
      });
      var marker = new google.maps.Marker({position: {lat: _lat, lng: _lng}, map: map});
    }


});
