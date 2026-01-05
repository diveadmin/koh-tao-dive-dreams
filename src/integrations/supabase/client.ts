// SQLite client setup using sql.js
import initSqlJs from 'sql.js';

// Initialize SQLite
let SQL;
let db: any = null;

const initializeDB = async () => {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });
  }

  if (!db) {
    // Try to load from localStorage
    const savedDbData = localStorage.getItem('koh-tao-db');
    if (savedDbData) {
      const dbArray = new Uint8Array(JSON.parse(savedDbData));
      db = new SQL.Database(dbArray);
    } else {
      db = new SQL.Database();
      // Create tables
      createTables();
      // Insert default data
      insertDefaultData();
    }
  }
  return db;
};

const createTables = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS booking_inquiries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      course_title TEXT NOT NULL,
      preferred_date TEXT,
      experience_level TEXT,
      message TEXT,
      created_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS user_roles (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at TEXT NOT NULL,
      UNIQUE(user_id, role)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS admin_settings (
      id TEXT PRIMARY KEY,
      setting_key TEXT NOT NULL UNIQUE,
      setting_value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
};

const insertDefaultData = () => {
  // Insert default admin user (for demo, user_id 'admin', role 'admin')
  const stmt = db.prepare("INSERT OR IGNORE INTO user_roles (id, user_id, role, created_at) VALUES (?, ?, ?, ?)");
  stmt.run([crypto.randomUUID(), 'admin', 'admin', new Date().toISOString()]);
  stmt.free();

  // Insert default admin email setting
  const stmt2 = db.prepare("INSERT OR IGNORE INTO admin_settings (id, setting_key, setting_value, updated_at) VALUES (?, ?, ?, ?)");
  stmt2.run([crypto.randomUUID(), 'notification_email', 'admin@example.com', new Date().toISOString()]);
  stmt2.free();
};

const saveDB = () => {
  if (db) {
    const data = db.export();
    const buffer = Array.from(data);
    localStorage.setItem('koh-tao-db', JSON.stringify(buffer));
  }
};

// Mock auth for simplicity - in real app, use proper auth
export const auth = {
  signInWithPassword: async (email: string, password: string) => {
    // Simple check: if email is 'admin@example.com' and password is 'admin'
    if (email === 'admin@example.com' && password === 'admin') {
      localStorage.setItem('user', JSON.stringify({ id: 'admin', email }));
      return { data: { user: { id: 'admin', email } }, error: null };
    }
    return { data: null, error: { message: 'Invalid credentials' } };
  },
  signUp: async (email: string, password: string) => {
    // For simplicity, allow signup but just set as user
    localStorage.setItem('user', JSON.stringify({ id: crypto.randomUUID(), email }));
    return { data: { user: { id: 'user', email } }, error: null };
  },
  signOut: async () => {
    localStorage.removeItem('user');
    return { error: null };
  },
  getUser: async () => {
    const user = localStorage.getItem('user');
    return { data: { user: user ? JSON.parse(user) : null } };
  }
};

// SQLite client
export const supabase = {
  from: (table: string) => ({
    select: (columns = '*') => {
      let query: any = { table, columns, filters: [], orderBy: null };
      const builder = {
        eq: (column: string, value: any) => {
          query.filters.push({ column, value, op: '=' });
          return builder;
        },
        order: (column: string, options: any) => {
          query.orderBy = { column, ascending: options.ascending };
          return builder;
        },
        maybeSingle: async () => {
          await initializeDB();
          let sql = `SELECT ${query.columns} FROM ${query.table}`;
          const params: any[] = [];
          query.filters.forEach((f: any) => {
            sql += ` WHERE ${f.column} ${f.op} ?`;
            params.push(f.value);
          });
          if (query.orderBy) {
            sql += ` ORDER BY ${query.orderBy.column} ${query.orderBy.ascending ? 'ASC' : 'DESC'}`;
          }
          sql += ' LIMIT 1';
          const stmt = db.prepare(sql);
          const result = stmt.getAsObject(params);
          stmt.free();
          saveDB();
          return { data: Object.keys(result).length ? result : null, error: null };
        },
        execute: async () => {
          await initializeDB();
          let sql = `SELECT ${query.columns} FROM ${query.table}`;
          const params: any[] = [];
          query.filters.forEach((f: any) => {
            sql += ` WHERE ${f.column} ${f.op} ?`;
            params.push(f.value);
          });
          if (query.orderBy) {
            sql += ` ORDER BY ${query.orderBy.column} ${query.orderBy.ascending ? 'ASC' : 'DESC'}`;
          }
          const stmt = db.prepare(sql);
          const results = [];
          while (stmt.step()) {
            results.push(stmt.getAsObject());
          }
          stmt.free();
          saveDB();
          return { data: results, error: null };
        },
        then: function(cb: any) { return this.execute().then(cb); }
      };
      return builder;
    },
    insert: (data: any) => {
      const obj = {
        execute: async () => {
          await initializeDB();
          const dataWithDefaults = { ...data };
          if (!dataWithDefaults.id) {
            dataWithDefaults.id = crypto.randomUUID();
          }
          if (!dataWithDefaults.created_at) {
            dataWithDefaults.created_at = new Date().toISOString();
          }
          if (!dataWithDefaults.updated_at && table === 'admin_settings') {
            dataWithDefaults.updated_at = new Date().toISOString();
          }
          const columns = Object.keys(dataWithDefaults).join(', ');
          const placeholders = Object.keys(dataWithDefaults).map(() => '?').join(', ');
          const values = Object.values(dataWithDefaults);
          const stmt = db.prepare(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`);
          stmt.run(values);
          stmt.free();
          saveDB();
          return { data: null, error: null };
        },
        then: function(cb: any) { return this.execute().then(cb); }
      };
      return obj;
    },
    update: (updates: any) => {
      let query: any = { table, updates, filters: [] };
      return {
        eq: (column: string, value: any) => {
          query.filters.push({ column, value, op: '=' });
          return {
            execute: async () => {
              await initializeDB();
              const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
              const values = [...Object.values(updates)];
              let sql = `UPDATE ${query.table} SET ${setClause}`;
              query.filters.forEach((f: any) => {
                sql += ` WHERE ${f.column} ${f.op} ?`;
                values.push(f.value);
              });
              const stmt = db.prepare(sql);
              stmt.run(values);
              stmt.free();
              saveDB();
              return { data: null, error: null };
            },
            then: function(cb: any) { return this.execute().then(cb); }
          };
        }
      };
    },
    delete: () => {
      let query: any = { table, filters: [] };
      return {
        eq: (column: string, value: any) => {
          query.filters.push({ column, value, op: '=' });
          return {
            execute: async () => {
              await initializeDB();
              let sql = `DELETE FROM ${query.table}`;
              const params: any[] = [];
              query.filters.forEach((f: any) => {
                sql += ` WHERE ${f.column} ${f.op} ?`;
                params.push(f.value);
              });
              const stmt = db.prepare(sql);
              stmt.run(params);
              stmt.free();
              saveDB();
              return { data: null, error: null };
            },
            then: function(cb: any) { return this.execute().then(cb); }
          };
        }
      };
    }
  }),
  auth,
  functions: {
    invoke: async (name: string, options: any) => {
      // Mock functions
      if (name === 'course-recommend') {
        // Simple recommendation logic
        return { data: { recommendation: 'PADI Open Water' }, error: null };
      }
      if (name === 'send-booking-notification') {
        console.log('Booking notification:', options.body);
        return { data: null, error: null };
      }
      return { data: null, error: null };
    }
  }
};