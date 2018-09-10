exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub', // This is targetting your local running instance of the selenium webdriver

    specs: [
        './features/*.feature'
    ],

    capabilities: {
        browserName: 'chrome' // You can use any browser you want. On a CI environment you're going to want to use PhantomJS
    },

    framework: 'custom', //We need this line to use the cucumber framework

    frameworkPath: require.resolve('protractor-cucumber-framework'), // Here it is

    cucumberOpts: {
        format: 'pretty',
        require: ['./features/step_definitions/*.js'], // This is where we'll be writing our actual tests
    },

    params: {
        env: {
            hostname: 'http://localhost:3000' // Whatever the address of your app is
        }
    }
};
