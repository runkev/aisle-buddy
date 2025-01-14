import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, Animated, Pressable } from 'react-native';
import { list } from '../database/sampleData';
import { Camera } from 'expo-camera';

const ShoppingListScreen = ({ navigation }) => {
    // Add state for managing checked items
    const [items, setItems] = useState(list.map(item => ({ ...item, checked: false })));

    const groupItemsByLocation = (item) => {
        const groupedItems = items.reduce((acc, item) => {
            if (!acc[item.location]) {
                acc[item.location] = [];
            }
            acc[item.location].push(item);
            return acc;
        }, {});

        return Object.keys(groupedItems).map(location => ({
            title: location,
            data: groupedItems[location]
        }));
    };

    const toggleItem = (itemId) => {
        setItems(items.map(item => 
            item.id === itemId 
                ? { ...item, checked: !item.checked }
                : item
        ));
    };

    const Item = ({item, onToggle, isChecked = false}) => {
        const fadeAnim = useRef(new Animated.Value(isChecked ? 1 : 0)).current;

        useEffect(() => {
            Animated.timing(fadeAnim, {
                toValue: isChecked ? 1 : 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }, [isChecked]);

        return (
            <Pressable
                style={({ pressed }) => [
                    styles.itemContainer,
                    styles.itemShadow,
                    pressed && styles.itemPressed,
                    isChecked && styles.itemPressedIn
                ]}
                onPress={() => onToggle(item.id)}
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
                        numberOfLines={2}
                    >
                        {item.title}
                    </Text>
                    
                    {item.quantity && (
                        <Text style={styles.quantity}>
                            x{item.quantity}
                        </Text>
                    )}
                </View>
            </Pressable>
        );
    };

    // const handleScanList = async () => {
    //     const { status } = await Camera.requestCameraPermissionsAsync();
    //     if (status === 'granted') {
    //         navigation.navigate('Scanner');
    //         } else {
    //         Alert.alert(
    //             'Permission Required',
    //             'Camera permission is required to use this feature',
    //             [{ text: 'OK' }]
    //         );
    //     }
    // };

    return (
        <View style={styles.screenContainer}>
            <SectionList
                sections={groupItemsByLocation(items)}
                renderItem={({item}) => (
                    <Item 
                        item={item} 
                        isChecked={item.checked}
                        onToggle={toggleItem}
                    />
                )}
                renderSectionHeader={({section: {title}}) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>{title}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
                style={styles.list}
                stickySectionHeadersEnabled={true}
            />
            
            <View style={styles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={() => navigation.navigate('Scanner')}
                >
                    <Text style={styles.buttonText}>Scan List</Text>
                </Pressable>
                
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={() => navigation.navigate('Add Item')}
                >
                    <Text style={styles.buttonText}>Add Item</Text>
                </Pressable>
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
        borderColor: '#229fd8',
        borderWidth: 1,
        marginVertical: 4,
        marginHorizontal: 16,
    },
    itemShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    itemPressed: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 1,
        backgroundColor: '#f8f8f8',
        transform: [{ scale: 0.98 }]
    },
    sectionHeader: {
        backgroundColor: '#fff',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginTop: 8,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#F3594D',
        marginLeft: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    checkboxContainer: {
        marginRight: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#F3594D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkmark: {
        color: '#229fd8',
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
        backgroundColor: '#F3594D',
        borderTopWidth: 1,
        borderTopColor: '#F3594D',
    },
    button: {
        backgroundColor: '#229fd8',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 1,
        minWidth: 120,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonPressed: {
        backgroundColor: '#1b86b6',
        transform: [{ scale: 0.98 }],
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default ShoppingListScreen;