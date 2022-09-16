import http from "../http-common";

class UserDataService {
    updateUser(userId, data) {
        return http.put(`/users/${userId}`, data, {
            headers: { "Content-type": "multipart/form-data" }
        });
    }

    getActivity(userId) {
        return http.get(`/users/${userId}/activity/`);
    }

    searchUsers(query) {
        return http.get("/users?username=" + query);
    }

    getUserById(userId) {
        return http.get("/users/" + userId);
    }

    getUserByName(username) {
        return http.get("/users/" + username + "?getBy=username")
    }

    getFollowers(by, query) {
        return http.get("/followers?" + by + "=" + query);
    }

    followUser(data) {
        return http.post("/followers", data);
    }

    unfollowUser(userId) {
        return http.delete("/followers?userId=" + userId)
    }
}

export default new UserDataService();