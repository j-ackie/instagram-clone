import UsersDAO from "../dao/usersDAO.js";
import upload, { get } from "../s3.js"
import { genSalt, hash, compare } from "bcrypt";

export default class UsersController {
    static async apiGetUser(req, res, next) {
        try {
            let getResponse;
            if (req.query.getBy === "username") {
                getResponse = await UsersDAO.getUserByName(req.params.userId);
            }
            else {
                getResponse = await UsersDAO.getUserById(req.params.userId);
            }

            if (!getResponse) {
                res.status(404).json({ error: "not found" });
                return;
            }

            const userInfo = {
                userId: getResponse._id,
                username: getResponse.username,
                profilePicture: getResponse.profilePicture
                                    ? await get(getResponse.profilePicture)
                                    : ""
            };

            res.json(userInfo);
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiCheckLogin(req, res, next) {
        if (req.session.userInfo) {
            res.json({
                loggedIn: true,
                userInfo: req.session.userInfo
            });
        }
        else {
            res.json({ loggedIn: false });
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
                username: req.body.username,
                profilePicture: getResponse.profilePicture
                                    ? await get(getResponse.profilePicture)
                                    : ""
            };
            
            req.session.userInfo = userInfo;

            res.json(userInfo);
            
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiLogout(req, res, next) {
        if (!req.session.userInfo) {
            res.status(401).json({ error: "not logged in" });
            return;
        }
        delete req.session.userInfo;
        res.json({ status: "logged out" });
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

    static async apiFollowUser(req, res, next) {
        
    }
}