import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, ScrollView } from 'react-native';
import { createTable } from '../database/DatabaseSetup';
import { addRecipe, deleteRecipe, getAllRecipes, searchRecipe } from '../database/RecipeService';
import RecipeCard from '../components/RecipeCard';
import { styles } from '../styles/styles';

export default function Home() {
  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [search, setSearch] = useState('');
  const [receitas, setReceitas] = useState<any[]>([]);

  useEffect(() => {
    createTable();
    loadRecipes();
  }, []);

  const loadRecipes = () => {
    getAllRecipes()
      .then((data: any) => setReceitas(data))
      .catch(err => console.log(err));
  };

  const handleAdd = () => {
    if (!nome || !ingredientes || !modoPreparo) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    addRecipe(nome, ingredientes, modoPreparo)
      .then(() => {
        setNome('');
        setIngredientes('');
        setModoPreparo('');
        loadRecipes();
      })
      .catch(err => console.log(err));
  };

  const handleSearch = () => {
    if (search === '') {
      loadRecipes();
      return;
    }
    searchRecipe(search)
      .then((data: any) => setReceitas(data))
      .catch(err => console.log(err));
  };

  const handleDelete = (id: number) => {
    deleteRecipe(id)
      .then(() => loadRecipes())
      .catch(err => console.log(err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🍲 Minhas Receitas</Text>

      <Text style={styles.sectionTitle}>➕ Adicionar Receita</Text>
      <TextInput
        placeholder="Nome da Receita"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Ingredientes"
        value={ingredientes}
        onChangeText={setIngredientes}
        style={styles.input}
      />
      <TextInput
        placeholder="Modo de Preparo"
        value={modoPreparo}
        onChangeText={setModoPreparo}
        style={styles.input}
      />
      <Button title="Adicionar Receita" onPress={handleAdd} color="#4CAF50" />

      <Text style={styles.sectionTitle}>🔍 Buscar Receita</Text>
      <TextInput
        placeholder="Digite o nome"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
      <Button title="Buscar" onPress={handleSearch} color="#2196F3" />

      <Text style={styles.sectionTitle}>📜 Lista de Receitas</Text>
      <FlatList
        data={receitas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard
            nome={item.nome}
            ingredientes={item.ingredientes}
            modoPreparo={item.modoPreparo}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
    </ScrollView>
  );
}
