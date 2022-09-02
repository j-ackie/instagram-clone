import http from "../http-common";

class PostDataService {
    getAll() {
        return http.get("/");
    }

    getPostById(postId) {
        return http.get("/post/" + postId);
    }

    getPostsByUserId(userId) {
        return http.get("/post?userId=" + userId);
    }

    createPost(data) {
        return http.post("/post", data, { headers: {"Content-type": "multipart/form-data"} });
    }

    deletePost(data) {
        return http.delete("/post?postId=" + data.postId, { data: { userId: data.userId } });
    }

    likePost(data) {
        return http.post("/likes", data);
    }

    getLikesById(postId) {
        return http.get("/likes?postId=" + postId);
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

    getUserByName(username) {
        return http.get("/user/" + username + "?getBy=username")
    }

    login(data) {
        return http.post("/login", data);
    }

    register(data) {
        return http.post("/register", data);
    }

    reset() {
        return http.post("/reset")
    }
}

export default new PostDataService();

