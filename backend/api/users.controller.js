import UsersDAO from "../dao/usersDAO.js";

export default class UsersController {
    static async apiGetUserById(req, res, next) {
        console.log(req.params);
        try {
            let userId = req.params.userId;
            let user = await UsersDAO.getUserById(userId);
            if (!user) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ error: err });
        }
    }

    static async apiLogin(req, res, next) {
        try {
            const LoginResponse = await UsersDAO.login(req.body);
            if (LoginResponse) {
                res.status(201).json({ status: "success" });
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