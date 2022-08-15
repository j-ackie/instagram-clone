import http from "../http-common";

class PostDataService {
    getAll() {
        return http.get("/");
    }

    getPostById(postId) {
        return http.get("/post/" + postId);
    }

    createPost(data) {
        return http.post("/post", data, { headers: {"Content-type": "multipart/form-data"} });
    }

    likePost(data) {
        return http.post("/like", data);
    }

    commentPost(data) {
        return http.post("/comment", data);
    }

    getComments(postId) {
        return http.get("/comment/" + postId);
    }

    getUserById(userId) {
        return http.get("/user/" + userId);
    }

    login(data) {
        return http.post("/login", data);
    }

    reset() {
        return http.post("/reset")
    }
}

export default new PostDataService();

