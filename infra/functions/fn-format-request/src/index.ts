import wcmatch from 'wildcard-match';

function handler(
  event: AWSCloudFrontFunction.Event
): AWSCloudFrontFunction.Request {
  const request = event.request;
  const uri = request.uri;

  /* if (
    uri.includes('/company/edit/') &&
    !uri.includes('/_next/static/chunks/')
  ) {
    request.uri = '/company/edit/[nationalIdentifier].html';
    return request;
  } */

  const isCompanyEditMatch = wcmatch('/company/edit/*');
  const isCompanyEditSubMatch = wcmatch('/company/edit/**/*');

  if (isCompanyEditMatch(uri)) {
    request.uri = '/company/edit/[nationalIdentifier].html';
    return request;
  }

  if (isCompanyEditSubMatch(request.uri)) {
    const path = request.uri.split('/').pop();
    request.uri = `/company/edit/[nationalIdentifier]/${path}.html`;
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
