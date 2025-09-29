import path from 'path';
import { fileURLToPath } from 'url';

// __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  config: path.resolve(__dirname, './src/db/config', 'database.cjs'),
  'models-path': path.resolve(__dirname, './src/db/models'),
  'seeders-path': path.resolve(__dirname, './src/db/seeders'),
  'migrations-path': path.resolve(__dirname, './src/db/migrations'),
};
