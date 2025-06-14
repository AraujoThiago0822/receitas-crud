import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('receitas.db');

export default db;
