import { env } from 'process';
import { MongoClient } from 'mongodb';

class DBClient {
  constructor(host = env.DB_HOST || 'localhost',
    port = env.DB_PORT || 27017, database = env.DB_DATABASE || 'files_manager') {
    this.database = database;
    const uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(uri);
    this.isConnected = false;
    this.client.connect().then(() => {
      this.isConnected = true;
    });
  }

  isAlive() {
    try {
      this.client.db().command({ ping: 1 });
      return this.isConnected;
    } catch (err) {
      return false;
    }
  }

  async nbUsers() {
    const users = this.client.db(this.database).collection('users');
    const userNum = await users.countDocuments({});
    return userNum;
  }

  async nbFiles() {
    const file = this.client.db(this.database).collection('files');
    const filesNum = await file.countDocuments({});
    return filesNum;
  }
}

const dbClient = new DBClient();
export default dbClient;
