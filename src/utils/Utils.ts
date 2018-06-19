import config from '../config/config';

export default {
  log: (stringToShow: string) => `${new Date().toLocaleString('fr-FR', { timeZone: 'UTC' })}: ${stringToShow}`,
  newDate: () => `${new Date().toLocaleString('fr-FR', { timeZone: 'UTC' })}`,
  getTokenKey: () => process.env.secret as string || config.secret,
  getMONGO_URI: () => process.env.MONGODB_URI as string || config.database,
  app: null,
  getApiUrl: () => process.env.apiUrl as string || config.api_url,
};