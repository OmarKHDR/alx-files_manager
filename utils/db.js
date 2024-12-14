import { env } from 'process'
import { MongoClient } from 'mongodb';

class DBClient {
  constructor(host = env.DB_HOST || 'localhost',
    port = env.DB_PORT || 27017, database = env.DB_DATABASE || 'files_manager') {
    const uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(uri);
    this.isConnected = false;
    this.client.connect().then( _ => {
      this.isConnected = true;
    });
  }


  isAlive() {
    try {
      this.client.db().command({ping: 1});
      return this.isConnected;
    }
    catch (err) {
      return false;
    }
  }

  async nbUsers() {
    
  }
}

let dbClient = new DBClient();
export default dbClient = dbClient;
