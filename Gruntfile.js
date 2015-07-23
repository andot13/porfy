module.exports = function(grunt){
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    imageoptim: {
      optimise: {
        src: ['public/images', 'public/images']
      }
    },

    less: {
      development: {
        files: {
          'public/stylesheets/style.css': 'public/less/style.less'
        },
        option: {
          livereload: true,
        }
      },

      production: {
        options: {
            cleancss: true,
        },

        files: {
            'public/stylesheets/style.css': 'public/less/style.less'
        },
        option: {
          livereload: true,
        }
      }
    },

    watch: {
      image: {
        files: ['public/images/*.jpg'],
        tasks: ['imageoptim:optimise'],
        options: {
          spawn: false,
        }
      },

      styles: {
        option: {
          spawn: false,
        },

        files: ['public/less/*.less', 'public/stylesheets/*.css'],
        tasks: ['less'],
        option: {
          livereload: true,
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-imageoptim');


  grunt.registerTask('default', ['watch']);
};