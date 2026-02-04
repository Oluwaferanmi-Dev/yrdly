import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Load environment variables from .env
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function runMigration() {
  try {
    const sqlPath = path.join(__dirname, 'scripts', 'create-ticketing-tables.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')

    console.log('Executing SQL migration...')
    
    // Split SQL by semicolon to execute separate statements
    // This is a simple split and might not handle all SQL cases, but should work for this script
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))

    for (const statement of statements) {
      console.log(`Executing statement: ${statement.substring(0, 50)}...`)
      const { error } = await supabase.rpc('exec_sql', { sql_query: statement })
      
      if (error) {
        // Fallback: If rpc exec_sql is not available, we might need a different approach
        // or just advise the user to run it in the SQL Editor.
        // However, let's try a direct query if possible, or use the postgres connection string.
        console.warn(`RPC failed or not found: ${error.message}. Attempting another way or finishing...`)
        
        // Actually, Supabase doesn't have a direct 'query' method in the JS client for arbitrary SQL
        // common practice is to use the SQL Editor. But maybe we can try the postgres client if installed.
        throw new Error('Supabase JS client does not support arbitrary SQL execution without a stored procedure. Please use the Supabase SQL Editor.')
      }
    }

    console.log('Migration completed successfully!')
  } catch (err) {
    console.error('Migration failed:', err.message)
    process.exit(1)
  }
}

// runMigration() // Commented out because js-client needs rpc for this.
// Alternative: Use 'pg' if available, but it's not in package.json.
// Let's try to use 'fetch' to Supabase API if there's a rest endpoint for SQL, or just tell the user.

console.log("Supabase JS client requires a stored function 'exec_sql' to run raw SQL.")
console.log("Since I cannot create that function without running SQL, please paste the contents of 'scripts/create-ticketing-tables.sql' into the Supabase SQL Editor.")
