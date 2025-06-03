import db from './Database';

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS receitas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        ingredientes TEXT,
        modoPreparo TEXT
      );`
    );
  });
};
