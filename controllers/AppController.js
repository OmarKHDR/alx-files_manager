import redisClient from '../utils/redis';
import dbClient from '../utils/db';

export default class AppController {
  static getStatus(req, res) {
    res.status(200).send(`${JSON.stringify({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    })}\n`);
  }

  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
      .then(([usersCount, filesCount]) => {
        res.status(200).send(`${JSON.stringify({ users: usersCount, files: filesCount })}\n`);
      });
  }
}
