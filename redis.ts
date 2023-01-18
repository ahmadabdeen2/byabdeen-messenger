import Redis from "ioredis";

let client_redis = new Redis(`${process.env.REDIS_URL}`);

export default client_redis;
