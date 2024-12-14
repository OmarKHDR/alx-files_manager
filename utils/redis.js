import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.connected = true;
    this.client.on('error', (e) => {
      console.log(e);
      this.connected = false;
    });
  }

  isAlive() {
    return this.connected;
  }

  async getVal(key) {
    return new Promise((resolve) => {
      this.client.get(key, (_, val) => {
        resolve(val);
      });
    });
  }

  async get(key) {
    const val = await this.getVal(key);
    return val;
  }

  async set(key, val, duration) {
    this.client.setex(key, duration, val);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
