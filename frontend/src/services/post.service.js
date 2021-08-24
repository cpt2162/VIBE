import http from "../http-common";

class PostService {
    getAll() {
        return http.get("posts/");
    }

    get(id) {
        return http.get('posts/${id}');
    }

    create(data) {
        return http.post("posts", data);
    }

}

export default new PostService();