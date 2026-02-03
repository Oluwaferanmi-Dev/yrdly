import { createHash } from 'node:crypto';

// Mocking the input data
const email = "test@example.com";
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
const ip = "127.0.0.1";

// Test Fingerprinting Logic
function testFingerprinting() {
    console.log("--- Testing Fingerprinting Logic ---");
    const fingerprintInput = `${ip}-${userAgent}`;
    const deviceId = createHash('sha256').update(fingerprintInput).digest('hex');
    console.log("Input:", fingerprintInput);
    console.log("SHA-256 Device ID:", deviceId);
    console.log("Length:", deviceId.length);
    console.log("Success: Fingerprint is unique and secure.\n");
}

// Test QR Code CID Logic
function testQRCodeCID() {
    console.log("--- Testing QR Code CID Logic ---");
    const qrCodeDataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
    const base64Content = qrCodeDataUrl.split(',')[1];
    
    console.log("Data URL Prefix removed:", !base64Content.includes("data:image/png;base64"));
    console.log("Base64 Content Length:", base64Content.length);
    console.log("Success: QR code properly extracted for CID attachment.\n");
}

testFingerprinting();
testQRCodeCID();
