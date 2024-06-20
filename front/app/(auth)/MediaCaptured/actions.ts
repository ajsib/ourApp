// app/actions.ts

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

export const saveMedia = async (fileLocation: string, caption: string) => {
    try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Permission to access the media library was denied');
        }

        const asset = await MediaLibrary.createAssetAsync(fileLocation);
        await MediaLibrary.createAlbumAsync('MyAppAlbum', asset, false);
        console.log('Media saved locally with caption:', caption);
    } catch (error) {
        throw error; 
    }
};

export const sendMedia = async (fileLocation: string, caption: string) => {
    try {
        const formData = new FormData();
        formData.append('file', {
            uri: fileLocation,
            name: 'image.jpg',
            type: 'image/jpeg',
        } as any);
        formData.append('caption', caption);

        // Replace 'YOUR_API_ENDPOINT' with your actual endpoint
        const response = await fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.ok) {
            console.log('Media sent successfully');
        } else {
            console.error('Failed to send media');
        }
    } catch (error) {
        console.error('Error sending media:', error);
    }
};
