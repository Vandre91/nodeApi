import config from '../config/config';

export default {
  newDate: () => `${new Date().toLocaleString('fr-FR', { timeZone: 'UTC' })}`,
  getTokenKey: () => config.secret,
  getMONGO_URI: () => process.env.MONGODB_URI as string || config.database,
  app: null,
};