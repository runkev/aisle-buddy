// ScannerScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Pressable } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function ScannerScreen({ navigation }) {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const takePicture = async () => {
        if (!cameraRef.current) return;
        
        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 1.0,
            });
            
            console.log('Photo taken:', photo.uri);
            Alert.alert('Success', 'Picture taken!');
            
        } catch (error) {
            console.error('Failed to take picture:', error);
            Alert.alert('Error', 'Failed to take picture');
        }
    };

    return (
        <View style={styles.container}>
            <CameraView 
                style={styles.camera} 
                facing='back'
                ref={cameraRef}
            >                
            </CameraView>
            <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.button} 
                        onPress={takePicture}
                    >
                        <View style={styles.innerCircle}>
                            <Ionicons name="camera" size={36} style={styles.cameraLogo} />
                        </View>
                    </Pressable>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 6,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: '#F3594D',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 15,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#229fd8',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    cameraLogo: {
        color: "#229fd8",
        justifyContent: 'center',
        alignItems: 'center'
    }
});