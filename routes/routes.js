// load up our shiny new route for users
const annotationRoutes = require('./annotation');
const annotationnamesRoutes = require('./annotationnames');
const fileRoutes = require('./file');
const filenamesRoutes = require('./filenames');

const appRouter = (app, fs) => {
  // we've added in a default route here that handles empty routes
  // at the base API url
  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });

  // run our user route module here to complete the wire up
  filenamesRoutes(app, fs);
  annotationnamesRoutes(app, fs);
  fileRoutes(app, fs);
  annotationRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;