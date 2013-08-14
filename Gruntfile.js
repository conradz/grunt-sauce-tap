module.exports = function(grunt) {

    grunt.initConfig({

        sauce_tap: {
            options: {
                user: process.env.SAUCE_USER,
                key: process.env.SAUCE_KEY
            },

            test: {
                options: {
                    browsers: [
                        { browserName: 'chrome', name: 'Chrome' },
                        { browserName: 'firefox', name: 'Firefox' }
                    ]
                },

                files: {
                    src: 'test.js'
                }
            }
        }

    });

    grunt.loadTasks('tasks');
    grunt.registerTask('test', ['sauce_tap']);
    grunt.registerTask('default', ['test']);

};