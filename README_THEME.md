# Kibana THEME (5.3.0)

Kibana 5.3.0 is going through a major refactor and building the css files isn't straight forward as there are several build tools compiling the css (Grunt, Gulp, and Webkit).  

- LESS files compile in the background on save. SASS files need to have uiFramework:start running in the background. 

## Getting Started
1. git clone git@github.com:istresearch/kibana.git
2. git checkout PULSE_THEME
3. npm cache verify
4. npm install
5. npm install babel-polyfill
5. After installation, run `npm run elasticsearch`. WAIT until it fully loads.
6. If you run into java errors, Install Java SE JDK at (http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) Next, set your Java library, `export JAVA_HOME=$(/usr/libexec/java_home)`, or set in your unix profile.
7. In another terminal, run  `npm start`.
8. In a third terminal, run `npm run uiFramework:start` This will start the SASS WATCH compiler.
9. Wait a few minutes and open up https://localhost:5601 in Chrome.
10. Locate the following compiled css files in Chrome: commons.style.css and kibana.style.css.
11. Overrride these compiled css files in https://kibana5.dev.istresearch.com/app/kibana.  I like to use the *Resource Override* plugin for Chrome.