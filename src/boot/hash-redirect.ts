import { boot } from 'quasar/wrappers';

export default boot(({ urlPath, redirect }) => {
  if (urlPath.startsWith('/#/')) {
    redirect({ path: urlPath.substring(2) });
    return;
  }
});
