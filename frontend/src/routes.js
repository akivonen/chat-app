const apiPath = '/api/v1';

const getRoute = {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
};

export default getRoute;
