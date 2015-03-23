exports.register = function (plugin, opts, next) {
  plugin.route({
    method: 'GET',
    path: '/client/',
    handler: function(request, reply) {
      reply.view('index', {
        isProduction: (process.env.NODE_ENV === 'production')
      });
    }
  });

  plugin.route({
    method: 'GET',
    path: '/client/{param*}',
    handler: {
      directory: {
        path: __dirname
      }
    }
  });

  if(process.env.NODE_ENV === 'production') {
    plugin.log(['info', 'client'], 'compile the client')
  }
  next();
}

exports.register.attributes = {
  name: 'client',
  version: '1.0.0'
};