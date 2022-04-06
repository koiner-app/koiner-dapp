import { boot } from 'quasar/wrappers';
import { Provider, Signer } from 'koilib';

interface KondorInstance {
  provider: Provider;
  signer: Signer;
  getAccounts: any;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $kondor: KondorInstance;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const kondor = window.kondor;

export default boot(({ app }) => {
  app.config.globalProperties.$kondor = kondor;
});

export { kondor };
