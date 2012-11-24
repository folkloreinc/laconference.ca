require.config({
  paths: {
    jquery: 'vendor/jquery.min',
    kinetic: 'vendor/kinetic-v4.0.5.min'
  },

  shim: {
    kinetic: {
        exports: function() { return Kinetic; }
    }
  }

});
 
require(['jquery', 'kinetic', 'app'], function(jquery, kinetic, app) {
  // use app here
  console.log(jquery, kinetic, app);
});