module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

  pkg: grunt.file.readJSON('package.json'),

      
      wiredep: {

          task: {

            // Point to the files that should be updated when
            // you run `grunt wiredep`
            src: [
              'index.html'
            ],

            options: {
              // See wiredep's configuration documentation for the options
              // you may pass:

              // https://github.com/taptapship/wiredep#configuration
            }
          }
        },
      uglify: {
        build: {
          src: 'js/script.js',
          dest: 'js/script.min.js'
        }
      }
    });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-wiredep');

  // Default task(s).
  grunt.registerTask('default', ['uglify','wiredep']);

};
