import db from './Database';

export const addRecipe = (nome: string, ingredientes: string, modoPreparo: string) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO receitas (nome, ingredientes, modoPreparo) VALUES (?, ?, ?);',
        [nome, ingredientes, modoPreparo],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const updateRecipe = (id: number, nome: string, ingredientes: string, modoPreparo: string) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE receitas SET nome = ?, ingredientes = ?, modoPreparo = ? WHERE id = ?;',
        [nome, ingredientes, modoPreparo, id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const deleteRecipe = (id: number) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM receitas WHERE id = ?;',
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const getAllRecipes = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM receitas;',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const searchRecipe = (nome: string) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM receitas WHERE nome LIKE ?;',
        [`%${nome}%`],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};
