'use strict';

/**
 * @ngdoc service
 * @name tvCodeTestApp.data
 * @description
 * # data
 * Factory in the tvCodeTestApp.
 */
angular.module('tvCodeTestApp')
  .factory('data', function ($q) {
    // private api
    var __data = {
      // Will turn this into $httpMock if I have time.
      res: {
        actors: [
          {
            firstName: 'Brad',
            lastName: 'Pit',
            age: 51
          },
          {
            firstName: 'Hayden',
            lastName: 'Panettiere',
            age: 26
          },
          {
            firstName: 'Zooey',
            lastName: 'Deschanel',
            age: 35
          },
          {
            firstName: 'Bradley',
            lastName: 'Cooper',
            age: 40
          }
        ],
        movies: [
          {
            title: 'Avengers: Age of Ultron',
            year: 2015,
            description: "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's Mightiest Heroes to stop the villainous Ultron from enacting his terrible plans.",
            actors: [
              {
                firstName: 'Brad',
                lastName: 'Pit',
                age: 51
              },
              {
                firstName: 'Hayden',
                lastName: 'Panettiere',
                age: 26
              },
              {
                firstName: 'Zooey',
                lastName: 'Deschanel',
                age: 35
              },
              {
                firstName: 'Bradley',
                lastName: 'Cooper',
                age: 40
              }
            ]
          },
          {
            title: 'Back to the Future',
            year: 1985,
            description: "Marty McFly (Michael J. Fox) is blasted to 1955 in the time machine created by Doc Brown (Christopher Lloyd) and finds himself in a time-shattering situation that jeopardizes his future.",
            actors: [
              {
                firstName: 'Brad',
                lastName: 'Pit',
                age: 51
              },
              {
                firstName: 'Hayden',
                lastName: 'Panettiere',
                age: 26
              },
              {
                firstName: 'Zooey',
                lastName: 'Deschanel',
                age: 35
              },
              {
                firstName: 'Bradley',
                lastName: 'Cooper',
                age: 40
              }
            ]
          },
          {
            title: 'Men in Black',
            year: 1997,
            description: "A sci-fi adventure comedy about two top secret agents (Tommy Lee Jones and Will Smith) with the everyday mission of policing alien activities on planet Earth. The Men in Black's current assignment: to stop an intergalactic terrorist from making Earth his next victim.",
            actors: [
              {
                firstName: 'Brad',
                lastName: 'Pit',
                age: 51
              },
              {
                firstName: 'Hayden',
                lastName: 'Panettiere',
                age: 26
              },
              {
                firstName: 'Zooey',
                lastName: 'Deschanel',
                age: 35
              },
              {
                firstName: 'Bradley',
                lastName: 'Cooper',
                age: 40
              }
            ]
          }
        ],
        directors: [
          {
            firstName: 'Clint',
            lastName: 'Eastwood',
            age: 85,
            latestMovie: {
              title: 'Men in Black',
              year: 1997,
              description: "A sci-fi adventure comedy about two top secret agents (Tommy Lee Jones and Will Smith) with the everyday mission of policing alien activities on planet Earth. The Men in Black's current assignment: to stop an intergalactic terrorist from making Earth his next victim.",
              actors: [
                {
                  firstName: 'Brad',
                  lastName: 'Pit',
                  age: 51
                },
                {
                  firstName: 'Hayden',
                  lastName: 'Panettiere',
                  age: 26
                },
                {
                  firstName: 'Zooey',
                  lastName: 'Deschanel',
                  age: 35
                },
                {
                  firstName: 'Bradley',
                  lastName: 'Cooper',
                  age: 40
                }
              ]
            }
          },
          {
            firstName: 'Woody',
            lastName: 'Allen',
            age: 79,
            latestMovie: {
              title: 'Men in Black',
              year: 1997,
              description: "A sci-fi adventure comedy about two top secret agents (Tommy Lee Jones and Will Smith) with the everyday mission of policing alien activities on planet Earth. The Men in Black's current assignment: to stop an intergalactic terrorist from making Earth his next victim.",
              actors: [
                {
                  firstName: 'Brad',
                  lastName: 'Pit',
                  age: 51
                },
                {
                  firstName: 'Hayden',
                  lastName: 'Panettiere',
                  age: 26
                },
                {
                  firstName: 'Zooey',
                  lastName: 'Deschanel',
                  age: 35
                },
                {
                  firstName: 'Bradley',
                  lastName: 'Cooper',
                  age: 40
                }
              ]
            }
          }
        ]
      }
    };



    // public api
    var data = {
      movies: {
        get: function(title){
          var defer = $q.defer();
          var mvs = [];
          angular.forEach(__data.res.movies, function(movie){
            if(data.movies.inBody(movie, title)){
              mvs.push(movie);
            }
          });
          // This normally wouldn't be handled synchronously, but I am not using an actual backend source.
          defer.resolve(mvs);
          return defer.promise;
        },
        inBody: function(movie, title){
          if(title == ""){
            return false;
          }
          if(movie.title.indexOf(title) > -1){
            return true;
          }
          else if(movie.description.indexOf(title) > -1){
            return true;
          }
          else {
            var acts = [];
            angular.forEach(movie.actors, function(actor){
              if((actor.firstName + ' ' + actor.lastName).indexOf(title) > -1){
                acts.push(actor)
              }
            });
            if(acts.length > 0){
              return true;
            }
          }
        }
      },
      directors: {
        get: function(name){
          var defer = $q.defer();
          var dirs = [];
          angular.forEach(__data.res.directors, function(director){
            if(data.directors.inBody(director, name)){
              dirs.push(director);
            }
          });
          // This normally wouldn't be handled synchronously, but I am not using an actual backend source.
          defer.resolve(dirs);
          return defer.promise;
        },
        inBody: function(director, name){
          if(name == ""){
            return false;
          }
          if((director.firstName + ' ' + director.lastName).indexOf(name) > -1){
            return true;
          }
          else if(director.latestMovie.title.indexOf(name) > -1){
            return true;
          }
          else if(director.latestMovie.description.indexOf(name) > -1){
            return true;
          }
        }
      },
      actors: {
        get: function(name){
          var defer = $q.defer();
          var actrs = [];
          angular.forEach(__data.res.actors, function(actor){
            if(data.actors.inBody(actor, name)){
              actrs.push(actor);
            }
          });

          defer.resolve(actrs);
          return defer.promise;
        },
        inBody: function(actor, name){
          if(name == ""){
            return false;
          }
          if((actor.firstName + ' ' + actor.lastName).indexOf(name) > -1){
            return true;
          }
          else if(actor.age == name){
            return true;
          }
        }
      }
    };

    return data;
  });
