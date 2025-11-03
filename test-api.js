// Quick test script to verify API connectivity
const axios = require('axios');

const API_URL = "https://flight-explorer-api.codewalnut.com/api/flights";

async function testAPI() {
  try {
    console.log("Testing API connection to:", API_URL);
    const response = await axios.get(API_URL, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
      }
    });
    
    console.log("✓ API Response Status:", response.status);
    console.log("✓ Response has flights:", !!response.data.flights);
    console.log("✓ Number of flights:", response.data.flights?.length || 0);
    
    if (response.data.flights && response.data.flights.length > 0) {
      console.log("\nSample flight:");
      console.log(JSON.stringify(response.data.flights[0], null, 2));
    }
    
    return true;
  } catch (error) {
    console.error("✗ API Test Failed:");
    if (error.response) {
      console.error("  Status:", error.response.status);
      console.error("  Data:", error.response.data);
    } else if (error.request) {
      console.error("  No response received");
      console.error("  Error:", error.message);
    } else {
      console.error("  Error:", error.message);
    }
    return false;
  }
}

testAPI();
