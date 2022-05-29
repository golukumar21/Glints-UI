
const GLINT_HOST = 'https://us-central1-glints-node-api.cloudfunctions.net/app/';
export const environment = {
  production: true,
  GLINTS: {
    register: GLINT_HOST + 'register',
    login: GLINT_HOST + 'login',
    userDetails: GLINT_HOST,
  },
};
