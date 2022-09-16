import AuthDAO from "../dao/authDAO.js";
import UsersDAO from "../dao/usersDAO.js";
import { hash, compare } from "bcrypt";
import { get } from "../s3.js";
import jwt from "jsonwebtoken";

export default class AuthController {
    static async apiRegister(req, res, next) {
        try {
            const getResponse = await UsersDAO.getUserByName(req.body.username);
            
            if (getResponse) {
                res.status(409).json({ error: "user already exists" });
                return;
            }

            const hashedPassword = await hash(req.body.password, 10);

            const createAuthUserResponse = await AuthDAO.createUser(hashedPassword);

            const { error } = createAuthUserResponse;
            if (error) {
                res.status(500).json({ error: error.message });
            }

            const userInfo = {
                _id: createAuthUserResponse.insertedId,
                username: req.body.username,
                profilePicture: "",
                bio: ""
            };

            const createUserResponse = await UsersDAO.createUser(userInfo);

            const payload = { userId: createAuthUserResponse.insertedId };
            req.payload = payload;
            next();
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiLogin(req, res, next) {
        try {
            const getUserResponse = await UsersDAO.getUserByName(req.body.username);

            if (!getUserResponse) {
                res.status(404).json({ error: "user not found" });
                return;
            }

            const getAuthResponse = await AuthDAO.getUserById(getUserResponse._id);

            if (! await compare(req.body.password, getAuthResponse.password)) {
                res.status(401).json({ error: "incorrect password" });
                return;
            }

            const payload = { userId: getUserResponse._id };
            req.payload = payload;
            next();
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiGetLogin(req, res) {
        const token = req.headers["authorization"];

        if (!token) {
            res.json({ loggedIn: false });
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decoded) => {
            if (err) {
                res.json({
                    loggedIn: false
                });
                return;
            }
            
            const getResponse = await UsersDAO.getUserById(decoded.userId);

            const userInfo = {
                userId: getResponse._id,
                username: getResponse.username,
                profilePicture: getResponse.profilePicture
                                    ? await get(getResponse.profilePicture)
                                    : "",
                bio: getResponse.bio
            };

            res.json({
                loggedIn: true,
                userInfo: userInfo
            });
        });
    }

    static async apiUpdatePassword(req, res, next) {
        if (req.userId !== req.params.userId) {
            res.status(401).json({ error: "cannot update another user" });
        }
        try {
            const getAuthResponse = await AuthDAO.getUserById(req.params.userId);

            if (! await compare(req.body.oldPassword, getAuthResponse.password)) {
                res.status(401).json({ error: "incorrect password" });
                return;
            }

            const hashedPassword = await hash(req.body.newPassword, 10);

            const updateResponse = await AuthDAO.updatePassword(req.params.userId, hashedPassword);
            const { error } = updateResponse;

            if (error) {
                res.status(500).json({ error: err.message });
                return;
            }

            res.status(204).json();
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}