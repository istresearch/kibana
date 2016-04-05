module.exports = function (kibana) {

  return new kibana.Plugin({

    uiExports: {
      visTypes: [
        'plugins/frame_vis/frame_vis'
      ]
    }

  });

};
