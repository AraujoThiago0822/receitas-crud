import * as SQLite from 'expo-sqlite';

// Abre ou cria o banco de dados 'receitas.db'
const db = SQLite.openDatabaseSync('receitas.db');

// Função para configurar o banco de dados
export function setupDatabase() {
  try {
    db.withTransactionSync(() => {
      db.execSync(`
        CREATE TABLE IF NOT EXISTS receitas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT NOT NULL,
          ingredientes TEXT,
          preparo TEXT
        );
      `);
    });
    console.log('Tabela "receitas" criada ou já existe.');
  } catch (error) {   
    console.error('Erro ao criar a tabela "receitas":', error);
  }
}

// Função para obter a instância do banco de dados
export function getDatabase() {
  return db;
}

export default db;
