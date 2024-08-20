const getAuthHeader = () => {
  const authToken = JSON.parse(localStorage.getItem('authToken'));
  if (authToken && authToken.token) {
    return { Authorization: `Bearer ${authToken.token}` };
  }
  return {};
};

export default getAuthHeader;
