define(function (require) {
  var $ = window.jQuery;
  var module = require('modules').get('kibana/frame_vis', ['kibana']);
  module.controller('KbnFrameVisController', function ($scope, $sce) {
    $scope.$watch('vis.params.url', function (url) {
      if (!url) return;
      var html = '<iframe data-id="' + $scope.$id + '" height="100%" width="100%" src="' + url + '"></iframe>';
      $scope.html = $sce.trustAsHtml(html);
      window.setTimeout(function () {
        $scope.updateFrame();
      }, 1000);
    });
    var $root = $scope;
    while ($root.$parent) {
      $root = $root.$parent;
    }
    window.$root = $root;
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
    window.onmessage = function (e) {
      try {
        var data = JSON.parse(e.data);
        if (data && data.query) {
          $('form[name="queryInput"] input[type="text"]').val(data.query);
          $('button[type="submit"]').click();
        }
      } catch (ex) {
      }
    };
  });
});
