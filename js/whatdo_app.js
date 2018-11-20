var app = angular.module("Whatdo",[]);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.controller('mController', function($scope, $interval, $http) {
    $scope.title = 'What do I do today?'
    $scope.adhocActivities = ['Go for a walk!', 'Have a picnic!', 'Draw something!'];
    $scope._data = null;
    $scope.activity;

    $scope.newActivity = function(obj){
      this.name = obj.name;
      this.longLocation = obj.location_summary;
      this.startTime = obj.datetime_start

      this.keyWords = function(){
        //Return keywords for user to dislike / dislike
        //avoid returning location_slug
        //TODO
      }
    }

    $scope.findActivity = function(){
      //generate ad-hoc activity from list
      var activity = '';
      //loop to avoid the same activity
      do {
        activity = $scope.adhocActivities[Math.floor(Math.random() * $scope.adhocActivities.length)];
      } while (activity === $scope.result);
      //$scope.activity = new $scope.newActivity(x);
    }

    $scope.findEventActivity = function(){
      //fetch function / event activity from eventfinda api
      $('.loader').show();
      if ($scope._data===null){
        $http({method: 'GET', url: "./php/getData.php"}).then(function(_data) {
          $scope._data = _data;
          var events = _data.data.events;
          activity = events[Math.floor(Math.random() * events.length)];
          $scope.activity = new $scope.newActivity(activity);
          console.log(activity.name)
          $scope.result = activity.name + ' at ' + activity.location_summary + " starting at " + activity.datetime_start;
          $('.loader').hide();
        });
      } else{
        console.log('yay! didnt touch')
        var events = $scope._data.data.events;
        activity = events[Math.floor(Math.random() * events.length)];
        console.log(activity.name)
        $scope.activity = new $scope.newActivity(activity);
        $scope.result = activity.name + ' at ' + activity.location_summary + " starting at " + activity.datetime_start;
        $('.loader').hide();
      }

    }
});
