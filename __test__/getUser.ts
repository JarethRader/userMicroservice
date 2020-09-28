const getOutputData = (userInfo: any) => {
  return {
    id: userInfo.id,
    username: userInfo.username,
    email: userInfo.email.toLowerCase(),
    verified: userInfo.verified,
    createdAt: userInfo.createdAt || new Date(userInfo.createdOn),
    // updatedAt: userInfo.updatedAt || new Date(userInfo.modifiedOn),
  };
};

export default getOutputData;
