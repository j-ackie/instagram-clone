import UsersDAO from "../dao/usersDAO.js";
import upload, { get } from "../s3.js"
import { genSalt, hash, compare } from "bcrypt";

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

            if (userInfo.profilePicture) {
                userInfo.profilePicture = await(get(userInfo.profilePicture));
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
            const getResponse = await UsersDAO.getUserByName(req.body.username);

            if (!getResponse) {
                res.status(401).json({ error: "user not found" });
                return;
            }

            if (! await compare(req.body.password, getResponse.password)) {
                res.status(401).json({ error: "incorrect password" });
                return;
            }

            let userInfo = {
                userId: getResponse._id,
                profilePicture: getResponse.profilePicture
                                    ? await get(getResponse.profilePicture)
                                    : ""
            };
            
            res.json(userInfo);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiRegister(req, res, next) {
        try {
            const getResponse = await UsersDAO.getUserByName(req.body.username);
            
            if (getResponse) {
                res.status(401).json({ error: "user already exists" });
                return;
            }

            req.body.password = await hash(req.body.password, 10);

            const registerResponse = await UsersDAO.register(req.body);
            if (registerResponse) {
                let data = {
                    status: "success",
                    userId: registerResponse.insertedId,
                    profilePicture: ""
                }
                res.status(201).json(data);
            }
            else {
                res.status(401).json({ error: "unable to register" });
            }
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}