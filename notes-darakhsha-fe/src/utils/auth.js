// src/utils/auth.js
import SimpleCrypto from "simple-crypto-js";

const SECRET_KEY = 'SCRAPY@!@#123'; // Replace with a secret key of your choice

// Function to set encrypted user data in localStorage
export const setUser = (data) => {
  const simpleCrypto = new SimpleCrypto(SECRET_KEY);
  const cipherText = simpleCrypto.encrypt(JSON.stringify(data));
  console.log("Encrypted Data:", cipherText); // Log the encrypted data
  localStorage.setItem("data", cipherText);
};

export const getUser = () => {
  const simpleCrypto = new SimpleCrypto(SECRET_KEY);
  const data = localStorage.getItem("data");
  

  if (data) {
    try {
      const decipherText = simpleCrypto.decrypt(data);
      console.log("Decrypted Data:", decipherText); // Debugging log

      // If the decrypted data is a string, try to parse it, otherwise return as is
      return typeof decipherText === "string" && decipherText.trim().startsWith("{")
        ? JSON.parse(decipherText)
        : decipherText;
    } catch (error) {
      console.error("Decryption Error:", error);
      return null; // Handle corrupted data gracefully
    }
  }
  return null;
};




export const setToken = (token) => {
  localStorage.setItem("auth_token", token);
}

export const getToken = () => {
  return localStorage.getItem("auth_token");
}
export const removeUser = () => {
  localStorage.removeItem("data");
}