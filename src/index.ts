import { ServerInitialize } from './application/server-initialize';
import { GraphqlWorker } from './graphQL/graphql-worker';

const graphqlWorker = new GraphqlWorker();
const serverInitialize = new ServerInitialize();

serverInitialize.init();

graphqlWorker.start()
    .catch(e => {
        console.error(e);
        process.exit(1);
    });