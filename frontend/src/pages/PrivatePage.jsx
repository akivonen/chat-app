import React from 'react';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const PrivatePage = () => {
  const header = getAuthHeader();

  return (
    <p>{Object.hasOwn(header, 'Authorization') && 'content'}</p>
  );
};

export default PrivatePage;
