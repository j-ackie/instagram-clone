import http from "../http-common";

class PostDataService {
    getAll(page=0) {
        return http.get("/?page=" + page);
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

    unlikePost(postId) {
        return http.delete("/likes?postId=" + postId);
    }

    getLikesById(postId) {
        return http.get("/likes?postId=" + postId);
    }

    savePost(data) {
        return http.post("/saves", data);
    }
    
    getSaves() {
        return http.get("/saves");
    }

    getSaveByPostId(postId) {
        return http.get("/saves?postId=" + postId);
    }

    commentPost(data) {
        return http.post("/comments", data);
    }

    getComments(postId) {
        return http.get("/comments?postId=" + postId);
    }
}

export default new PostDataService();

