// ScannerScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Pressable } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { detectTextInImage } from '../api/cloudVision';


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

            const base64Data = await FileSystem.readAsStringAsync(photo.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            
            return base64Data;
            
        } catch (error) {
            console.error('Error capturing or converting image:', error);
            return null;
        }
    };

    const handleCapture = async () => {
        try {
            const base64Image = await takePicture();
            if (base64Image) {
                console.log('Image captured and converted successfully');
                
                const textResults = await detectTextInImage(base64Image);

                if (textResults) {
                    console.log('Detected Text:', textResults.text);
                    Alert.alert('Text captured:', textResults.text);
                }

                if (!textResults) {
                    console.log('Text not detected/captured');
                    Alert.alert('Text not detected/captured');
                }
            }
        } catch {
            console.error('Error in capture:', error);
            Alert.alert('Error', 'Failed to capture image');
        }

    }

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
                        onPress={handleCapture}
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