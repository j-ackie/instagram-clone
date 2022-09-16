import http from "../http-common";

class AuthDataService {
    updatePassword(userId, data) {
        return http.put(`/auth/${userId}`, data);
    }
}

export default new AuthDataService();