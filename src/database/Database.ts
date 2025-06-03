import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('receitas.db');

export default db;
