import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Props = {
  receita: any;
  onEdit: () => void;
  onDelete: () => void;
};

export default function RecipeCard({ receita, onEdit, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{receita.titulo}</Text>
      <Text>Ingredientes: {receita.ingredientes}</Text>
      <Text>Preparo: {receita.preparo}</Text>
      <View style={styles.actions}>
        <Button title="Editar" onPress={onEdit} />
        <Button title="Excluir" onPress={onDelete} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, margin: 8, backgroundColor: '#eee', borderRadius: 8 },
  titulo: { fontWeight: 'bold', fontSize: 16 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }
});
