
// API.js

const BASE_URL = 'http://localhost:8080'; // Replace with your API base URL

// Function to make a GET request with authentication headers
export const getWithAuth = async (url, accessToken) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };




  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: 'GET',
      headers,
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('API request failed');
    }
  } catch (error) {
    throw error;
  }
};

// Function to make a POST request with authentication headers
export const postWithAuth = async (url, accessToken, data) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('API request failed');
    }
  } catch (error) {
    throw error;
  }
};

