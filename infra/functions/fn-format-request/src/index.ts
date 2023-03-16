let routes = require('../routes-manifest.json');

const appendToDirs = 'index.html';

function handler(
  event: AWSCloudFrontFunction.Event
): AWSCloudFrontFunction.Request {
  const request = event.request;
  const uri = request.uri;

  const { dynamicRoutes, staticRoutes } = routes;

  /* if (uri === '/') {
    // turns "/" to "/index.html"
    request.uri += 'index.html';
  } else if (uri.endsWith('/')) {
    // turns "/foo/" to "/foo.html"
    request.uri = uri.slice(0, -1) + '.html';
  } else if (!uri.includes('.')) {
    // turns "/foo" to "/foo.html"
    request.uri += '.html';
  } */
  if (!uri || uri === '/' || uri === '') {
    return request;
  }

  dynamicRoutes.forEach((route: any) => {
    if (uri.match(route.regex)) {
      if (uri.charAt(-1) === '/') {
        request.uri = route.page + appendToDirs;
      } else {
        request.uri = route.page + '/' + appendToDirs;
      }

      return request;
    }
  });

  staticRoutes.forEach((route: any) => {
    if (uri.match(route.regex)) {
      if (uri.charAt(-1) === '/') {
        request.uri = route.page + appendToDirs;
      } else {
        request.uri = route.page + '/' + appendToDirs;
      }

      return request;
    }
  });

  return request;
}
