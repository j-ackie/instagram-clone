import UsersDAO from "../dao/usersDAO.js";
import upload, { get } from "../s3.js"

export default class UsersController {
    static async apiGetUserById(req, res, next) {
        try {
            let userId = req.params.userId;
            let userInfo = await UsersDAO.getUserById(userId);
            if (!userInfo) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            delete userInfo.password;

            if (userInfo.profile_picture) {
                userInfo.profile_picture = await(get(userInfo.profile_picture));
            }
            else {
                userInfo.profile_picture = null;
            }

            res.json(userInfo);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ error: err });
        }
    }

    static async apiLogin(req, res, next) {
        try {
            const loginResponse = await UsersDAO.login(req.body);
            if (loginResponse) {
                let data = {
                    status: "success",
                    userId: loginResponse._id,
                    username: loginResponse.username
                };
                res.status(201).json(data);
            }
            else {
                res.status(401).json({ error: "nope" });
            }
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}