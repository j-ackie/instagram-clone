import http from "../http-common";

class UserDataService {
    register(data) {
        return http.post(`/auth/register`, data);
    }

    login(data) {
        return http.post(`/auth/login`, data);
    }

    getLogin() {
        return http.get(`/auth/me`);
    }

    logout() {
        return http.post(`/auth/logout`);
    }

    updateUser(userId, data) {
        return http.put(`/users/${userId}`, data, {
            headers: { "Content-type": "multipart/form-data" }
        });
    }

    updatePassword(userId, data) {
        return http.put(`/users/${userId}`, data);
    }

    getActivity(userId) {
        return http.get(`/activity/${userId}`);
    }
}

export default new UserDataService();