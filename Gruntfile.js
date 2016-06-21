module.exports = function(grunt) {

  var fs = require('fs');
  require('marko/node-require').install();
  var indexTemplate = require('./src/index.marko');

  grunt.initConfig({
    watch: {
      scripts: {
        files: 'src/index.marko',
        tasks: ['create-index'],
        options: {
          interrupt: true,
        },
      },
    },
  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('watch-index', ['watch']);

  grunt.registerTask('create-index', function () {

    var done = this.async();

    // Render to a callback function:
    indexTemplate.render({}, (err, html) => {
      if (err) {
        grunt.log.error(err);
      }

      fs.writeFile('bin/index.html', html, (err) => {
        if (err) {
          grunt.log.error(err);
        }

        done();
      })
    });

    grunt.log.writeln('Creating index');
  });
};