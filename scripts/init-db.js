const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function initDatabase() {
  console.log('🚀 Connecting to Supabase PostgreSQL database...');
  const client = new Client({
    host: 'aws-0-eu-north-1.pooler.supabase.com',
    port: 6543,
    user: 'postgres.deygresqfgwyafdohani',
    password: 'H@mzafarida123',
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected to Supabase DB successfully!');

    const sqlFilePath = path.join(__dirname, 'schema.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('⚡ Executing schema.sql migration and seeding demo data...');
    await client.query(sqlScript);

    console.log('🎉 Migration successful! Verifying created tables...');
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log('📋 Current Public Tables:', tablesRes.rows.map(r => r.table_name));

    // Verify row counts
    const testCount = await client.query('SELECT COUNT(*) FROM test_catalog;');
    const bookingCount = await client.query('SELECT COUNT(*) FROM bookings;');
    const invoiceCount = await client.query('SELECT COUNT(*) FROM invoices;');

    console.log(`📊 Stats: ${testCount.rows[0].count} Tests in catalog | ${bookingCount.rows[0].count} Bookings | ${invoiceCount.rows[0].count} Invoices.`);
    console.log('✅ Database initialization completed successfully!');
  } catch (err) {
    console.error('❌ Database migration error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

initDatabase();
