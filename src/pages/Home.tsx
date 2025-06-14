import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { setupDatabase } from '../database/DatabaseSetup';
import { addReceita, getReceitas, deleteReceita, updateReceita, searchReceitas } from '../database/RecipeService';
import RecipeCard from '../components/RecipeCard';

type Receita = {
  id: number;
  titulo: string;
  ingredientes: string;
  preparo: string;
};

export default function Home() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [busca, setBusca] = useState('');
  const [titulo, setTitulo] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [preparo, setPreparo] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  // Inicialização do banco e carregamento das receitas
  useEffect(() => {
    setupDatabase();
    carregarReceitas();
  }, []);

  function carregarReceitas() {
    getReceitas((data) => setReceitas(data));
  }

  function buscar(texto: string) {
    setBusca(texto);
    if (texto.length > 0) {
      searchReceitas(texto, setReceitas);
    } else {
      carregarReceitas();
    }
  }

  function salvarReceita() {
    if (!titulo.trim()) {
      Alert.alert('Título é obrigatório');
      return;
    }
    if (editId === null) {
      addReceita(titulo, ingredientes, preparo, (ok) => {
        if (ok) {
          limparFormulario();
          carregarReceitas();
          Alert.alert('Receita adicionada!');
        } else {
          Alert.alert('Erro ao adicionar receita');
        }
      });
    } else {
      updateReceita(editId, titulo, ingredientes, preparo, (ok) => {
        if (ok) {
          limparFormulario();
          carregarReceitas();
          Alert.alert('Receita atualizada!');
        } else {
          Alert.alert('Erro ao atualizar receita');
        }
      });
    }
  }

  function limparFormulario() {
    setTitulo('');
    setIngredientes('');
    setPreparo('');
    setEditId(null);
  }

  function editarReceita(receita: Receita) {
    setTitulo(receita.titulo);
    setIngredientes(receita.ingredientes);
    setPreparo(receita.preparo);
    setEditId(receita.id);
  }

  function excluirReceita(id: number) {
    Alert.alert('Excluir', 'Tem certeza que deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteReceita(id, (ok) => {
            if (ok) {
              carregarReceitas();
              Alert.alert('Receita excluída!');
            } else {
              Alert.alert('Erro ao excluir receita');
            }
          });
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Receitas</Text>
      <TextInput
        placeholder="Buscar receita..."
        value={busca}
        onChangeText={buscar}
        style={styles.input}
      />
      <FlatList
        data={receitas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard
            receita={item}
            onEdit={() => editarReceita(item)}
            onDelete={() => excluirReceita(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', margin: 16 }}>Nenhuma receita encontrada.</Text>}
        style={{ flex: 1, marginBottom: 16 }}
      />
      <View style={styles.form}>
        <Text style={styles.formHeader}>{editId ? 'Editar Receita' : 'Nova Receita'}</Text>
        <TextInput
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
          style={styles.input}
        />
        <TextInput
          placeholder="Ingredientes"
          value={ingredientes}
          onChangeText={setIngredientes}
          style={styles.input}
        />
        <TextInput
          placeholder="Modo de preparo"
          value={preparo}
          onChangeText={setPreparo}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={salvarReceita}>
          <Text style={styles.buttonText}>{editId ? "Atualizar Receita" : "Adicionar Receita"}</Text>
        </TouchableOpacity>
        {editId && (
          <TouchableOpacity style={[styles.button, { backgroundColor: '#888' }]} onPress={limparFormulario}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fafafa' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  input: { backgroundColor: '#fff', padding: 8, marginVertical: 4, borderRadius: 6 },
  form: { marginTop: 16 },
  formHeader: { fontWeight: 'bold', marginBottom: 8 },
  button: { backgroundColor: '#2196F3', padding: 12, borderRadius: 6, marginTop: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
