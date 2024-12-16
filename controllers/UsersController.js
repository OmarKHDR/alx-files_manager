import dbClient from '../utils/db';
import sha1 from 'sha1'

export default class UsersController {
  static async postNew(req, res) {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;
    if (!email) {
      res.status(400).json({ error: 'missing email' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }
    const collection = dbClient.db(dbClient.database).collection(dbClient.collection);
    const user = await collection.findOne({ email });
    if (user) {
      res.status(400).json({ error: 'already exists' });
      return;
    }
    collection.insertOne({ email, password: sha1(password) });
  }
}