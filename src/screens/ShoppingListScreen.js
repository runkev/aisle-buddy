import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { list } from '../database/sampleData';

const ShoppingListScreen = ({ navigation }) => {

    const Item = ({title, quantity}) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title} ({quantity})</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                renderItem={({item}) => <Item title={item.title} quantity={item.quantity} />}
                style={styles.list}
            />
            
            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Scanner')}
                >
                <Text style={styles.buttonText}>Scan List</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('AddItem')}
                >
                <Text style={styles.buttonText}>Add Item</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    list: {
        flex: 1,
    },
    itemContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemLocation: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ShoppingListScreen;