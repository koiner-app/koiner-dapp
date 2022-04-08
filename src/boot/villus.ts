import { createClient } from 'villus';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
  // Which endpoint to connect to
  const endpoints = {

    // Local development
    'default': '/graphql',
    // 'web.docker'      : 'http://api.docker/graphql',
    // 'web.docker:3000' : 'http://api.docker/graphql',
    // '172.17.0.1:3000' : 'http://172.17.0.1:3010/graphql',
    // 'localhost:8081'  : 'http://api.docker',
  };

  // Setup the Villus client
  const villusClient = createClient({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    url: endpoints[document.location.host] || endpoints['default'],
  });

  app.use(villusClient);
})
