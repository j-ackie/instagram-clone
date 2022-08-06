import http from "../http-common";

class PostDataService {
    createPos(data) {
        console.log(data)
        return http.post("/post", JSON.stringify({"data": "hey"}));
    }
}

export default new PostDataService();

