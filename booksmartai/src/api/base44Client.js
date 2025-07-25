// Frontend client that calls our backend functions instead of using SDK directly

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-app.vercel.app' // Replace with your actual Vercel URL
  : 'http://localhost:3000';

class BackendClient {
  constructor() {
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  async callFunction(functionName, data) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`/api/functions/${functionName}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Entity operations
  async entityOperation(entity, operation, data = {}) {
    return this.callFunction('entities', {
      entity,
      operation,
      ...data
    });
  }

  // Auth operations  
  async authOperation(operation, data = {}) {
    return this.callFunction('auth', {
      operation,
      ...data
    });
  }
}

export const base44 = new BackendClient();
