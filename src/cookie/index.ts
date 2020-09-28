const buildCookieConfig: BuildCookieConfig = (envConfig) => {
  const cookieConfig = {
    /* tslint:disable */
    maxAge: parseInt(envConfig['SESS_LIFETIME'], 10),
    sameSite: true,
    secure: envConfig['NODE_ENV'] === 'production' ? true : false,
    /* tslint:enable */
  };

  return cookieConfig;
};

export default buildCookieConfig;
