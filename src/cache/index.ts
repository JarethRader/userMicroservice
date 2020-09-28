import redis from 'redis';

const buildRedisStore: BuildRedisStore = (session, envConfig) => {
  const RedisStore = require('connect-redis')(session);
  const RedisClient = redis.createClient(
    /* tslint:disable */
    parseInt(envConfig['REDIS_PORT'], 10),
    envConfig['REDIS_HOST'],
    {
      password: envConfig['REDIS_PASSWORD'],
    }
    /* tslint:enable */
  );
  RedisClient.unref();
  RedisClient.on('error', (options: any) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  });

  const store = new RedisStore({
    client: RedisClient,
  });

  return store;
};

export default buildRedisStore;
