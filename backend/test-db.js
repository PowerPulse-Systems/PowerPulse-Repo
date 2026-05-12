const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_si6eR3KrMmJg@ep-late-wave-apcvjk1l-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require'
});
client.connect()
  .then(() => { console.log('Node.js pg connected successfully!'); client.end(); })
  .catch(err => { console.error('Node.js pg failed to connect:', err); process.exit(1); });
