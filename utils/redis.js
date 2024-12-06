#!/usr/bin/env node
import { createClient } from "redis";

class RedisClient {
  constructor() {
    redis = createClient();
	redis.on('error', (err) => {
	  console.log(err);
	})
  }
}