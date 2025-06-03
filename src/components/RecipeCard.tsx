import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  nome: string;
  ingredientes: string;
  modoPreparo: string;
  onDelete: () => void;
};

export default function RecipeCard({ nome, ingredientes, modoPreparo, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{nome}</Text>
      <Text style={styles.label}>Ingredientes:</Text>
      <Text>{ingredientes}</Text>
      <Text style={styles.label}>Modo de Preparo:</Text>
      <Text>{modoPreparo}</Text>
      <TouchableOpacity onPress={onDelete} style={styles.button}>
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#FF5252',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
