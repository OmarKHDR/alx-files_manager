import crypto from 'crypto';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';

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
    const collection = dbClient.client.db(dbClient.database).collection('users');
    const user = await collection.findOne({ email });
    if (user) {
      res.status(400).json({ error: 'already exists' });
      return;
    }
    try {
      const userDb = await collection.insertOne({
        email,
        password: UsersController.sha1(password),
      });
      const insertId = userDb.insertedId;
      const result = await collection.findOne({ _id: ObjectId(insertId) });
      if (userDb) {
        res.status(201).json({
          _id: result._id,
          email: result.email,
        });
      }
    } catch (err) {
      console.log(err);
    }
    return;
  }

  static sha1(data) {
    const hash = crypto.createHash('sha1');
    hash.update(data);
    return hash.digest('hex');
  }
}
