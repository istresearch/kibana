define(function (require) {
  var $ = $;
  var module = require('modules').get('kibana/frame_vis', ['kibana']);
  module.controller('KbnFrameVisController', function ($scope, $sce) {
    $scope.$watch('vis.params.url', function (url) {
      if (!url) return;
      var html = '<iframe data-id="' + $scope.$id + '" height="100%" width="100%" src="' + url + '"></iframe>';
      $scope.html = $sce.trustAsHtml(html);
    });
    $scope.$watch('esResponse', function (resp) {
      window.setTimeout(function () {
        var frame = $('iframe[data-id="' + $scope.$id + '"]').get(0);
        var query = $('form[name="queryInput"] input[type="text"]').val();
        var filter = {
          'query': query,
          'time': window.$root.timefilter.time
        };
        frame.contentWindow.postMessage(JSON.stringify(filter), '*');
      }, 100);
    });
    var $root = $scope;
    while ($root.$parent) {
      $root = $root.$parent;
    }
    window.$root = $root;
  });
});
