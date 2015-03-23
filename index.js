var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server('0.0.0.0', 8888, {
  views: {
    engines: {
      html: require('handlebars')
    },
    defaultExtension: 'html',
    isCached: true,
    basePath: __dirname,
    path: './views'
  }
});

// Add the route
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.redirect('/client/');
  }
});

server.pack.register([{
  plugin: require('./client'),
  options: {}
}], function(err) {
  if(err) {
    console.error('Failed to load plugin:', err);
  } else {
    server.log(['server'], 'Started ReactFluxExample on port 8080');
  }
});

// Start the server
server.start();