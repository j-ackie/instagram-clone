import http from "../http-common";

class AuthDataService {
    register(data) {
        return http.post(`/auth/register`, data);
    }

    login(data) {
        return http.post(`/auth/login`, data, );
    }

    getLogin() {
        return http.get(`/auth/me`);
    }
    
    updatePassword(userId, data) {
        return http.put(`/auth/${userId}`, data);
    }
}

export default new AuthDataService();