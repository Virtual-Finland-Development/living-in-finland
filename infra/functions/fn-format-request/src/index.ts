const dynamicRouteRegex =
  /\/edit\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/;

function handler(
  event: AWSCloudFrontFunction.Event
): AWSCloudFrontFunction.Request {
  const request = event.request;
  const uri = request.uri;

  if (uri.includes('/company/edit/')) {
    request.uri = '/company/edit/[nationalIdentifier].html';
    return request;
  }

  if (uri === '/') {
    // turns "/" to "/index.html"
    request.uri += 'index.html';
  } else if (uri.endsWith('/')) {
    // turns "/foo/" to "/foo.html"
    request.uri = uri.slice(0, -1) + '.html';
  } else if (!uri.includes('.')) {
    // turns "/foo" to "/foo.html"
    request.uri += '.html';
  }

  return request;
}
