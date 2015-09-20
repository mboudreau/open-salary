Open Salary
==========

### First Time

To get started, you will need to install [Nodejs](http://nodejs.org/) (**must be 32-bit for Windows**).  Then open up Git Bash (you do have git installed, right?) and execute the following command:

    npm install -g grunt-cli bower karma phantomjs karma-phantomjs-launcher protractor

This will install [Grunt](http://gruntjs.com/), [Bower](http://bower.io/) and [PhantomJS](http://phantomjs.org/) automatically and make it available globally.  Next, change the directory to the CRM git repo (in Git Bash still) and do the following commnands:

    npm install
    bower install

    Note: If 'bower install' is not found, you will need to copy the following from your user PATH to the global PATH environment variable: 'C:\Users\{your_username_here}\AppData\Roaming\npm;'

This will install project specific dependencies.  Every time a dependency is changed, remember to do both.  If you don't, an error will occur during the build process.

### Building

Once you're ready to develop, you can use some simple Grunt commands to help you on your way.  For to most part however, this is the command you will use the most:

    grunt watch

This is a simple command that watches your development files for changes, then compiles them automatically, as well as [serve it on your localhost accessed at http://localhost:8080/](http://localhost:8080/). The command will have to be restarted if new files are added however.

The other two commands that are used are

    grunt build

The build command is the same as you'll see in `watch`, but without the continuous watching of files or the web server.
