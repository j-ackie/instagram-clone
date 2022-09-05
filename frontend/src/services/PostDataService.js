import http from "../http-common";

class PostDataService {
    getAll() {
        return http.get("/");
    }

    getPostById(postId) {
        return http.get("/posts/" + postId);
    }

    getPostsByUserId(userId) {
        return http.get("/posts?userId=" + userId);
    }

    createPost(data) {
        return http.post("/posts", data, { headers: {"Content-type": "multipart/form-data"} });
    }

    deletePost(postId) {
        return http.delete("/posts/" + postId);
    }

    likePost(data) {
        return http.post("/likes", data);
    }

    getLikesById(postId) {
        return http.get("/likes?postId=" + postId);
    }

    commentPost(data) {
        return http.post("/comments", data);
    }

    getComments(postId) {
        return http.get("/comments/" + postId);
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

    checkLogin() {
        return http.get("/login");
    }

    login(data) {
        return http.post("/login", data);
    }

    logout() {
        return http.post("/logout");
    }

    register(data) {
        return http.post("/register", data);
    }

    reset() {
        return http.post("/reset")
    }
}

export default new PostDataService();

