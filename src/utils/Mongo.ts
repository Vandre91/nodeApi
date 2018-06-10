import * as mongoose from 'mongoose';
import utils from './Utils';

class Mongo {
  public mongoose = mongoose;
  public db;

  constructor() {
    this.config();
  }

  public config() {
    mongoose.connect(utils.getMONGO_URI() || process.env.MONGODB_URI as string);
    this.db = mongoose.connection;
    // tslint:disable-next-line:no-console
    this.db.on('error', () => console.log(`${utils.newDate()}: connection error:`));
    // tslint:disable-next-line:no-console
    this.db.once('open', () => console.log(`${utils.newDate()}: Connected to Mongo`));
  }
}

export default Mongo;