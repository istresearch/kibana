define(function (require) {
  // we need to load the css ourselves
  require('plugins/frame_vis/frame_vis.less');

  // we also need to load the controller and used by the template
  require('plugins/frame_vis/frame_vis_controller');

  // register the provider with the visTypes registry so that other know it exists
  require('ui/registry/vis_types').register(FrameVisProvider);

  function FrameVisProvider(Private) {
    var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));

    // return the visType object, which kibana will use to display and configure new
    // Vis object of this type.
    return new TemplateVisType({
      name: 'frame',
      title: 'IFrame widget',
      icon: 'fa-code',
      description: 'Useful for displaying explanations or instructions for dashboards.',
      template: require('plugins/frame_vis/frame_vis.html'),
      params: {
        editor: require('plugins/frame_vis/frame_vis_params.html')
      },
      requiresSearch: false
    });
  }

  // export the provider so that the visType can be required with Private()
  return FrameVisProvider;
});
