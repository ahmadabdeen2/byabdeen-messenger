import Redis from "ioredis";

let client_redis = new Redis(`${process.env.NEXT_PUBLIC_REDIS_URL}`);

export default client_redis;
