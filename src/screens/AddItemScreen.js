import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function AddItemScreen({ navigation }) {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleAddItem = () => {
        if (itemName.trim()) {
        // Here you would typically add the item to your data storage
        // (e.g., state management solution or local storage)
        const newItem = {
            id: Date.now().toString(),
            name: itemName.trim(),
            quantity: quantity || '1',
        };
        
        // Navigate back to shopping list with new item
        navigation.navigate('ShoppingList', { newItem });
        }
    };

    return (
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Item name"
            value={itemName}
            onChangeText={setItemName}
        />
        <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
        />
        <Pressable
            style={({ pressed }) => [
            styles.addButton,
            pressed && styles.buttonPressed
            ]}
            onPress={handleAddItem}
        >
            <Text style={styles.buttonText}>Add Item</Text>
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    addButton: {
        backgroundColor: '#229fd8',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonPressed: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});