const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

class AdminApiService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/admin`;
  }

  getAuthHeaders(token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  async getAllUsers(token) {
    const response = await fetch(`${this.baseURL}/users`, {
      headers: this.getAuthHeaders(token)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  }

  async getUserById(token, userId) {
    const response = await fetch(`${this.baseURL}/users/${userId}`, {
      headers: this.getAuthHeaders(token)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  }

  async updateUserRole(token, userId, role) {
    const response = await fetch(`${this.baseURL}/users/${userId}/role`, {
      method: 'PUT',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify({ role })
    });

    if (!response.ok) {
      throw new Error('Failed to update user role');
    }

    return response.json();
  }

  async deleteUser(token, userId) {
    const response = await fetch(`${this.baseURL}/users/${userId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(token)
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    return response.json();
  }

  async createUser(token, userData) {
    const response = await fetch(`${this.baseURL}/users`, {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    return response.json();
  }

  async getSystemStats(token) {
    const response = await fetch(`${this.baseURL}/stats`, {
      headers: this.getAuthHeaders(token)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch system stats');
    }

    return response.json();
  }
}

export default new AdminApiService();