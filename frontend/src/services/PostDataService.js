import http from "../http-common";

class PostDataService {
    getAll() {
        return http.get("/");
    }

    getPostById(postId) {
        return http.get("/post/" + postId);
    }

    createPost(data) {
        console.log("Creating post: " + data);
        return http.post("/post", data);
    }

    getUserById(userId) {
        return http.get("/user/" + userId);
    }

    login(data) {
        console.log("Logging in: " + data);
        return http.post("/login", data);
    }

    reset() {
        return http.post("/reset")
    }
}

export default new PostDataService();

