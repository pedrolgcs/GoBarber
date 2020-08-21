export default {
  jwt: {
    secrete: process.env.APP_SECRET || 'default',
    expiresIn: '8d',
  },
};
