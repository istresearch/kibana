define(function (require) {
  // we need to load the css ourselves
  require('css!plugins/frame_vis/frame_vis.css');

  // we also need to load the controller and used by the template
  require('plugins/frame_vis/frame_vis_controller');

  return function (Private) {
    var TemplateVisType = Private(require('plugins/vis_types/template/template_vis_type'));

    // return the visType object, which kibana will use to display and configure new
    // Vis object of this type.
    return new TemplateVisType({
      name: 'frame',
      title: 'Webpage Widget',
      icon: 'fa-code',
      description: 'Allows you to embed a webpage into a dashboard.',
      template: require('text!plugins/frame_vis/frame_vis.html'),
      params: {
        editor: require('text!plugins/frame_vis/frame_vis_params.html')
      },
      requiresSearch: false
    });
  };
});
