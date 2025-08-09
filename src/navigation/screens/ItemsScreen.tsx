import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { addItem, updateItem } from '../../store/slices/itemsSlice';

const ItemsScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const items = useSelector((state: RootState) => state.items.items);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (editingId) {
      dispatch(updateItem({ id: editingId, name, description }));
      setEditingId(null);
    } else {
      dispatch(addItem({ name, description }));
    }
    setName('');
    setDescription('');
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
  };

 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Items Management</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Item name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Item description"
        value={description}
        onChangeText={setDescription}
      />
      
      <Button 
        title={editingId ? 'Update Item' : 'Add Item'} 
        onPress={handleSubmit} 
      />
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemText}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity 
                style={[styles.button, styles.editButton]} 
                onPress={() => handleEdit(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  itemText: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 5,
    minWidth: 60,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ItemsScreen;
