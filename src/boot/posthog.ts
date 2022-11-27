import { boot } from 'quasar/wrappers';
import posthog from 'posthog-js';
import { useAccountStore } from 'stores/account';

export default boot(({ app }) => {
  const accountStore = useAccountStore();

  if (
    window.location.hostname === 'koiner.app' &&
    accountStore.anonymousId !== 'koiner'
  ) {
    app.config.globalProperties.$posthog = posthog.init(
      'phc_GamleU2kzsEt2zN14Gmw7fzTQ1nsMBaGGs0JdSplfnI',
      {
        api_host: 'https://app.posthog.com',
        disable_persistence: true,
        bootstrap: {
          distinctID: accountStore.anonymousId,
        },
      }
    );
  }
});
