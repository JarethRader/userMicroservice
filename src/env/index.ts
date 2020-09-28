import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV! as string;

let envPath;
switch (nodeEnv) {
  case 'test':
    envPath = path.resolve(__dirname, './.env.test');
    break;
  case 'production':
    envPath = path.resolve(__dirname, './.env.production');
    break;
  case 'development':
    envPath = path.resolve(__dirname, './.env.development');
    break;
  default:
    throw new Error('Specify the NODE_ENV variable');
}

const envConfig = dotenv.parse(fs.readFileSync(envPath));

export default envConfig;
