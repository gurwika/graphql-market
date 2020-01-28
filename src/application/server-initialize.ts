  
import path from 'path';
import dotenvSafe from 'dotenv-safe';

export class ServerInitialize {
	init() {
		dotenvSafe.config({
			path: path.join(__dirname, '../../.env.' + process.env.NODE_ENV),
			sample: path.join(__dirname, '../../.env.example'),
			allowEmptyValues: true
		});
	}
}