import { getDatabase } from './DatabaseSetup';

const db = getDatabase();

// Adicionar receita
export function addReceita(
  titulo: string,
  ingredientes: string,
  preparo: string,
  callback: (ok: boolean) => void
) {
  try {
    db.withTransactionSync(() => {
      db.runSync(
        'INSERT INTO receitas (titulo, ingredientes, preparo) VALUES (?, ?, ?);',
        [titulo, ingredientes, preparo]
      );
    });
    callback(true);
  } catch (error) {
    console.log('Erro ao adicionar receita:', error);
    callback(false);
  }
}

// Atualizar receita
export function updateReceita(
  id: number,
  titulo: string,
  ingredientes: string,
  preparo: string,
  callback: (ok: boolean) => void
) {
  try {
    db.withTransactionSync(() => {
      db.runSync(
        'UPDATE receitas SET titulo=?, ingredientes=?, preparo=? WHERE id=?;',
        [titulo, ingredientes, preparo, id]
      );
    });
    callback(true);
  } catch (error) {
    console.log('Erro ao atualizar receita:', error);
    callback(false);
  }
}

// Excluir receita
export function deleteReceita(id: number, callback: (ok: boolean) => void) {
  try {
    db.withTransactionSync(() => {
      db.runSync('DELETE FROM receitas WHERE id=?;', [id]);
    });
    callback(true);
  } catch (error) {
    console.log('Erro ao excluir receita:', error);
    callback(false);
  }
}

// Listar todas as receitas
export function getReceitas(callback: (data: any[]) => void) {
  try {
    const result = db.getAllSync('SELECT * FROM receitas;');
    callback(result);
  } catch (error) {
    console.log('Erro ao buscar receitas:', error);
    callback([]);
  }
}

// Buscar receitas pelo título
export function searchReceitas(query: string, callback: (data: any[]) => void) {
  try {
    const result = db.getAllSync(
      'SELECT * FROM receitas WHERE titulo LIKE ?;',
      [`%${query}%`]
    );
    callback(result);
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    callback([]);
  }
}
