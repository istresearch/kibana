define(function (require) {
  var $ = window.jQuery;
  var module = require('modules').get('kibana/frame_vis', ['kibana']);
  module.controller('KbnFrameVisController', function ($scope, $sce, $window, $timeout) {
    $scope.$watch('vis.params.url', function (url) {
      if (!url) return;
      var html = '<iframe data-id="' + $scope.$id + '" height="100%" width="100%" src="' + url + '"></iframe>';
      $scope.html = $sce.trustAsHtml(html);
      $timeout(function () {
        $scope.updateFrame();
      }, 1000);
    });
    $scope.updateFrame = function () {
      var frame = $('iframe[data-id="' + $scope.$id + '"]').get(0);
      var query = $('form[name="queryInput"] input[type="text"]').val();
      var filter = {
        'query': query,
        'time': window.$root.timefilter.time
      };
      frame.contentWindow.postMessage(JSON.stringify(filter), '*');
    };
    $scope.$watch('esResponse', function (resp) {
      $scope.updateFrame();
    });
    angular.element($window).bind('message', function (e) {
      try {
        var data = JSON.parse(e.originalEvent.data);
        if (data && data.query) {
            var $dash = angular.element(document.querySelector('form')).scope();
            $dash.state.query.query_string.query = data.query;
            $dash.refresh();
        }
      } catch (ex) {
      }
    });
  });
});
