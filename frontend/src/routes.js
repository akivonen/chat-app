const apiPath = '/api/v1';

const getRoute = {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  singUpPath: () => [apiPath, 'signup'].join('/'),
  chatPagePath: () => '/',
};

export default getRoute;
