const API_BASE_URL = "http://127.0.0.1:8000";

export async function apiClient(endpoint: string, options: RequestInit = {}) {
    const config: RequestInit = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
        }

        return response.status !== 204 ? response.json() : null;
    } catch (error) {
        console.error(`API Request failed: ${endpoint}`, error);
        throw error;
    }
}
