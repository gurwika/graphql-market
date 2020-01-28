import pg from 'pg';
import { ApolloServer } from 'apollo-server';

const { makeSchemaAndPlugin } = require("postgraphile-apollo-server");

export class GraphqlWorker {
	private postGraphileOptions: any;
	private dbSchema: string;

	constructor() { 
		this.dbSchema = process.env.DATABASE_SCHEMA || 'public';

		this.postGraphileOptions = {
			jwtSecret: process.env.GRAPHILE_JWT_SECRET
		}
	}
	
	async start() {
		const pgPool = new pg.Pool({
		  connectionString: process.env.DATABASE_URL
		});
		
		const { schema, plugin } = await makeSchemaAndPlugin(
			pgPool,
			this.dbSchema,
			this.postGraphileOptions
		);
	
		const server = new ApolloServer({
			schema,
			plugins: [plugin]
		});
	
		server.listen({
			port: process.env.PORT
		}).then(({ url })  => {
			console.log(`Server ready at ${url}`);
		})
	}
}