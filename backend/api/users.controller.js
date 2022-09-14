import UsersDAO from "../dao/usersDAO.js";
import FollowersDAO from "../dao/followersDAO.js";
import jwt from "jsonwebtoken";
import upload, { get, del } from "../s3.js"
import { hash, compare } from "bcrypt";

export default class UsersController {
    static async apiSearchUsers(req, res, next) {
        // Handling for if req.query.username is not defined
        try {
            const searchResponse = await UsersDAO.searchUsers(req.query.username);
            
            for (const user of searchResponse) {
                delete user.password;
                if (user.profilePicture) {
                    user.profilePicture = await get(user.profilePicture);
                }
            }

            res.json({ users: searchResponse });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

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
                                    : "",
                bio: getResponse.bio
            };

            res.json(userInfo);
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiUpdateUser(req, res) {
        if (req.userId !== req.params.userId) {
            res.status(401).json("cannot update another user");
            return;
        }
        try {
            const data = {};
            if (req.body.username) {
                if (req.body.username === "") {
                    res.status(400).json({ error: "username cannot be empty" });
                    return;
                }

                const getUsernameResponse = await UsersDAO.getUserByName(req.body.username);
                if (getUsernameResponse) {
                    res.status(409).json({ error: "username already taken" });
                    return;
                }

                data.username = req.body.username;
            }
            if (req.body.bio) {
                data.bio = req.body.bio;
            }

            const getUserIdResponse = await UsersDAO.getUserById(req.params.userId);
            const prevFilename = getUserIdResponse.profilePicture;
            if (req.file) {
                const filename = await upload(req.file);
                data.profilePicture = filename;
            }
            else if (req.body.profilePicture === "") {
                data.profilePicture = "";
            }

            const updateResponse = await UsersDAO.updateUser(req.params.userId, data);

            const { error } = updateResponse;
            if (error) { 
                res.status(500).json({ error: error.message });
                return;
            }
            if (req.file && prevFilename) {
                await del(prevFilename);
            }
            res.status(204).json();
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiGetFollowers(req, res, next) {
        try {
            const getResponse = await FollowersDAO.getFollowers(req.query);
            res.json({ followers: getResponse });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiFollowUser(req, res, next) {
        if (req.body.userId === req.userId) {
            res.status(401).json({ error: "cannot follow yourself" });
            return;
        }

        try {
            const getUserResponse = await UsersDAO.getUserById(req.body.userId);

            if (!getUserResponse) {
                res.status(401).json({ error: "user does not exist" });
            }

            const getFollowerResponse = await FollowersDAO.getFollowerByIds(req.body.userId, req.userId);
            
            if (getFollowerResponse) {
                res.status(401).json({ error: "already following" });
                return;
            }

            const createResponse = await FollowersDAO.createFollower(req.body.userId, req.userId);
            
            const { error } = createResponse;
            if (error) {
                throw new Error("hey")
            }

            res.status(201).json({ status: "success" });
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async apiUnfollowUser(req, res, next) {
        if (req.query.userId === req.userId) {
            res.status(400).json({ error: "cannot unfollow yourself" });
            return;
        }

        try {
            const getUserResponse = await UsersDAO.getUserById(req.query.userId);

            if (!getUserResponse) {
                res.status(400).json({ error: "user does not exist" });
            }

            const getFollowerResponse = await FollowersDAO.getFollowerByIds(req.query.userId, req.userId);
            
            if (!getFollowerResponse) {
                res.status(400).json({ error: "already not following" });
                return;
            }

            const deleteResponse = await FollowersDAO.deleteFollower(req.query.userId, req.userId);
            
            const { error } = deleteResponse;
            if (error) {
                throw new Error("hey")
            }

            res.status(201).json({ status: "success" });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}