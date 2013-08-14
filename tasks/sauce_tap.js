var Runner = require('sauce-tap-runner'),
    async = require('async');

module.exports = function(grunt) {

    grunt.registerMultiTask(
        'sauce_tap',
        'Run TAP tests in Sauce Labs.',
        task);

    var defaults = {
        browsers: [],
        user: '',
        key: '',
        timeout: 30
    };

    function printResults(browser, results) {
        if (!results.ok) {
            grunt.log.error(
                'Browser ' + browser.name +
                ' failed ' + results.fail.length + ' tests.');
        } else {
            grunt.log.writeln('Browser ' + browser.name + ' passed all tests!');
        }

        results.fail.forEach(function(t) {
            grunt.log.error('Test #' + t.number + ': ' + t.name + ' failed.')
        });

        results.errors.forEach(function(e) {
            grunt.log.error('TAP parsing error: ' + e.message);
        });
    }

    function task() {
        var options = this.options(defaults),
            src = '';

        if (options.browsers.length === 0) {
            grunt.log.warn('No browsers specified.');
            return false;
        }

        if (!options.user || !options.key) {
            grunt.log.warn('Sauce Labs credentials must be provided.');
            return false;
        }

        this.filesSrc.forEach(function(f) {
            src += grunt.file.read(f);
        });

        var done = this.async(),
            runner = new Runner(options.user, options.key);

        runner.on('tunnel-connect', function() {
            grunt.log.writeln('Connecting Sauce Connect tunnel...');
        });

        runner.on('tunnel', function() {
            grunt.log.writeln('Sauce Connect tunnel connected.');
        });

        var success = true;

        async.eachSeries(options.browsers, run, complete);

        function run(browser, callback) {
            var opts = { timeout: options.timeout, port: options.port };
            grunt.log.writeln('Testing browser ' + browser.name + '...');

            runner.run(src, browser, opts, function(err, results) {
                if (err) {
                    return callback(err);
                }

                if (!results.ok) {
                    success = false;
                }

                printResults(browser, results);
                callback();
            });
        }

        function complete(err, results) {
            if (err) {
                grunt.log.error(err);
                success = false;
            }

            runner.close(function() {
                done(success);
            });
        }
    }
};
