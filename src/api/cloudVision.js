import { GOOGLE_CLOUD_API_KEY } from "@env";

const VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';

export const detectTextInImage = async (base64Image) => {
    try {
        console.log('Making Vision API request...');
        const requestBody = {
            requests: [{
                image: {
                    content: base64Image
                },
                features: [{
                    type: 'DOCUMENT_TEXT_DETECTION'
                }]
            }]
        };

        console.log('Sending request to Vision API...');
        const response = await fetch(`${VISION_API_URL}?key=${GOOGLE_CLOUD_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log('Received Vision API response:', data);

        if (!response.ok) {
            throw new Error(data.error?.message || 'API call failed');
        }

        const textAnnotations = data.responses[0].fullTextAnnotation;
        return textAnnotations;
    } catch {
        console.error('Vision API Error:', error);
        throw error;
    }
}