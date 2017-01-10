module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          "public/javascripts/all.js": ["public/javascripts/all.js"]
        }
      }
    },
    bower_concat: {
      all: {
        dest: "public/javascripts/vendor/all.js",
        dependencies: {
          "underscore": "jquery",
          "backbone": "underscore"
        }
      }
    },
    concat: {
      options: {
        separator: ";"
      },
      dist: {
        src: [
               "public/javascripts/vendor/all.js",
               "public/javascripts/handlebarsTemplates.js",
               "public/javascripts/models/article.js",
               "public/javascripts/collections/articles.js",
               "public/javascripts/app.js"
             ],
        dest: "public/javascripts/all.js"
      }
    },
    handlebars: {
      all: {
        files: {
          "public/javascripts/handlebarsTemplates.js": ["handlebars/**/*.hbs"]
        },
        options: {
          processContent: removeWhitespace,
          processName: extractFileName
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-bower-concat");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-handlebars");

  grunt.registerTask("default", ["bower_concat", "concat", "uglify"]);
};

function removeWhitespace(template) {
  return template.replace(/ {2,}/mg, '').replace(/\r|\n/mg, '');
}

function extractFileName(file) {
  return file.match(/\/(.+)\.hbs/).pop();
}
