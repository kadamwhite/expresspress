# ExpressPress

This project is a demonstration of how <a href="http://wordpress.org">WordPress</a> can be used to provide content for an application written in <a href="http://nodejs.org">Node.js</a>, a server-side JavaScript runtime. WordPress is a mature and powerful content management system, with a longer history and better non-developer usability than many of the options available natively in Node. With the help of the <a href="http://github.com/WP-API/WP-API">WordPress REST API plugin</a> (which is targeted for integration with WordPress core some time in 2015), you can leverage the excellent content-editing interface and data store of WordPress from any Node app.

ExpressPress itself is a lightweight blog viewer, which will serve the content from your WP-API-enabled WordPress site. It uses the <a href="https://www.npmjs.org/package/wordpress-rest-api">wordpress-rest-api</a> NPM module to query resources under the WP-API endpoint.

## Installation

To run ExpressPress locally (which we recommend, as this is first and foremost a learning resource), follow the following steps.

1. Clone this repository
2. Install <a href="http://nodejs.org/">Node.js</a> (On OSX, we recommend installing Node via <a href="http://brew.sh/">Homebrew</a>)
3. Inside the cloned repository directory, run `npm install` to install the dependencies
4. Create a file called "config.yml" within the repository directory, with the following content (see the <a href="https://github.com/WP-API/WP-API">WP-API project</a> for instructions on installing and enabling the API plugin):

      ```yml
      # careful: yaml syntax requires spaces, NOT tabs!
      wordpress:
        endpoint: 'http://www.your-api-enabled-wp-site.com/wp-json'
        cacheLimit: 3600000 # 1000ms * 60s * 60m = 1hr
      ```
5. From the command-line, run `npm start` to run the application.
  - To run on a specific port, run `PORT=XXXX npm start`, where XXXX is a valid http port e.g. `8080`.
6. Visit <a href="http://localhost:3000">http://localhost:3000</a> (or whatever port you specified) to view your site
7. Alter the code, learn how it works, add new routes, & experiment! The server will automatically restart if you change any server-side files.

## Credits

Thanks to <a href="https://github.com/tbranyen">Tim Branyen</a>, <a href="https://github.com/carldanley">Carl Danley</a>, <a href="https://github.com/iros">Irene Ros</a>, <a href="https://github.com/bmac">Brendan McLoughlin</a> and everyone else at <a href="http://bocoup.com">Bocoup</a> for their assistance in reviewing and supporting this project!
