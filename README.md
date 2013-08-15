# grunt-sauce-tap

[![Build Status](https://travis-ci.org/conradz/grunt-sauce-tap.png?branch=master)](https://travis-ci.org/conradz/grunt-sauce-tap)
[![Dependency Status](https://gemnasium.com/conradz/grunt-sauce-tap.png)](https://gemnasium.com/conradz/grunt-sauce-tap)

Run TAP tests in the browser using Sauce Labs.


## Getting Started

This plugin requires Grunt `~0.4.1`.

Install the plugin:

```shell
npm install grunt-sauce-tap --save-dev
```

Once the plugin has been installed, it must be loaded by your Gruntfile like
this:

```js
grunt.loadNpmTasks('grunt-sauce-tap');
```


## sauce_tap task

To get started running tests, add a section named `sauce_tap` to your Grunt
config like this:

```js
grunt.initConfig({

    sauce_tap: {
        options: {
            user: 'user', // Sauce Labs username
            key: 'key',   // Sauce Labs key
            timeout: 30,  // Test timeout (optional)
            port: 8000    // Port for the test HTTP server (optional)
        },
        your_target: {
            options: {
                // Desired capabilities for the browsers you want to test
                browsers: [
                    {
                        name: 'Chrome', // Include a name for nice log output
                        browserName: 'chrome',
                        platform: 'linux'
                    },
                    // ... more browsers
                ]
            },

            // Specify the files to test
            files: {
                test: ['tests.js']
            }
        }
  }

});
```


## Options

### `user`

Your Sauce Labs username (probably should get this from the environment
variables; it should not be embedded in the source files).

### `key`

Your Sauce Labs key (also should not be embedded in the source files, see
above).

### `timeout`

The test timeout in seconds. If a browser has not completed the tests in the
specified number of seconds, it will be canceled.

### `port`

The port to use for test HTTP server. The Sauce Connect tunnel only proxies
certain ports, so be careful which one you use. The default port should work
fine in most cases.

### `browsers`

An array of objects that specifies the browsers to run the tests in. Be sure to
provide a `name` property in each browser so it can be identified in the task
output. See the [Sauce Labs docs](https://saucelabs.com/docs/additional-config)
for the options for each browser.
