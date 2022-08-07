import http from "../http-common";

class PostDataService {
    getAll() {
        return http.get("/");
    }
    createPost(data) {
        console.log(data);
        return http.post("/post", data);
    }
    reset() {
        return http.post("/reset")
    }
}

export default new PostDataService();

