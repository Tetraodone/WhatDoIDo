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
      }
      $scope.activity = new activityObj(activityName);
      $scope.last = $scope.activity.name;
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

    $scope.displayActivity = function(){
      if($scope.eventCheckBox){
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

});
