define(function (require) {
  require('registry/vis_types').register(function (Private) {
    return Private(require('plugins/frame_vis/frame_vis'));
  });
});
