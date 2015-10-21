'use strict';

/**
 * @ngdoc directive
 * @name tvCodeTestApp.directive:search
 * @description
 * # search
 */
angular.module('tvCodeTestApp')
  .directive('search', function (data) {
    return {
      templateUrl: '/views/search.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.searchInput = "";
        scope.searchCrit = {
          movies: true,
          directors: false,
          actors: false
        };
        scope.results = [];


        scope.clickMovies = function(){
          scope.searchCrit.movies = !scope.searchCrit.movies;
        }
        scope.clickDirectors = function(){
          scope.searchCrit.directors = !scope.searchCrit.directors;
        }
        scope.clickActors = function(){
          scope.searchCrit.actors = !scope.searchCrit.actors;
        }

        scope.updateInput = function(){
          scope.results = [];
          if(scope.searchCrit.movies){
            searchMovies();
          }
          if(scope.searchCrit.directors){
            searchDirectors();
          }
          if(scope.searchCrit.actors){
            searchActors();
          }
        }

        scope.getTitle = function(point){
          if(point.firstName){
            return point.firstName + ' ' + point.lastName
          }

          return point.title;
        }

        scope.getDetails = function(point){
          if(point.age){

            if(point.latestMovie){
              return 'Age: ' + point.age + '\n Latest Movie: ' + point.latestMovie;
            }
            return 'Age: ' + point.age;
          }
          return point.description
        }
        var stack = function(points){
          angular.forEach(points, function(point){
            scope.results.push(point);
          })
        }
        var searchMovies = function(){
          data.movies.get(scope.searchInput)
          .then(function(res){
            if(res.length > 0){
              stack(res)
            }
          })
        },
        searchDirectors = function(){
          data.directors.get(scope.searchInput)
          .then(function(res){
            if(res.length > 0){
              stack(res)
            }
          })
        },
        searchActors = function(){
          data.actors.get(scope.searchInput)
          .then(function(res){
            if(res.length > 0){
              stack(res)
            }
          })
        }

      }
    };
  });
