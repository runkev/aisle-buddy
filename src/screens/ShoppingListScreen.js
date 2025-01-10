import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Camera } from 'expo-camera';
import { list } from '../database/sampleData';

const ShoppingListScreen = ({ navigation }) => {
    // Add state for managing checked items
    const [items, setItems] = useState(list.map(item => ({ ...item, checked: false })));

    const toggleItem = (itemId) => {
        setItems(items.map(item => 
            item.id === itemId 
                ? { ...item, checked: !item.checked }
                : item
        ));
    };

    const Item = ({item, onToggle, isChecked = false}) => {
        const fadeAnim = React.useRef(new Animated.Value(isChecked ? 1 : 0)).current;

        React.useEffect(() => {
            Animated.timing(fadeAnim, {
                toValue: isChecked ? 1 : 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }, [isChecked]);

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => onToggle(item.id)}
                activeOpacity={0.7}
            >
                <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox}>
                        {isChecked && (
                            <Animated.Text
                                style={[
                                    styles.checkmark,
                                    { opacity: fadeAnim }
                                ]}
                            >
                                ✓
                            </Animated.Text>
                        )}
                    </View>
                </View>
                
                <View style={styles.contentContainer}>
                    <Text 
                        style={[
                            styles.title,
                            isChecked && styles.checkedTitle
                        ]}
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>
                    
                    {item.quantity && (
                        <Text style={styles.quantity}>
                            x{item.quantity}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.screenContainer}>
            <FlatList
                data={items}
                renderItem={({item}) => (
                    <Item 
                        item={item} 
                        isChecked={item.checked}
                        onToggle={toggleItem}
                    />
                )}
                keyExtractor={item => item.id}
                style={styles.list}
            />
            
            <View style={styles.buttonContainer}>
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
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    list: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 4,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    checkboxContainer: {
        marginRight: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkmark: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        flex: 1,
        marginRight: 8,
    },
    checkedTitle: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    quantity: {
        fontSize: 14,
        color: '#666',
        minWidth: 30,
        textAlign: 'right',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        minWidth: 120,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ShoppingListScreen;