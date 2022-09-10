import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../../UserProvider";
import ProfilePosts from "./ProfilePosts";
import ProfileSaves from "./ProfileSaves";
import gridIcon from "../../icons/grid.svg";
import tagIcon from "../../icons/person-square.svg";
import bookmarkIcon from "../../icons/bookmark.svg";

export default function ProfileContent(props) {
    const [selectedTab, setSelectedTab] = useState("posts");

    const [userInfo, setUserInfo] = useContext(UserContext);

    const { state } = useLocation();

    useEffect(() => {
        if (state) {
            setSelectedTab(state);
            return;
        }
        setSelectedTab("posts");
    }, [props.profileUserInfo, state]);

    return (
        <div className="profile-content">
            <div className="tabs">
                <span 
                    onClick={ () => setSelectedTab("posts") } 
                    className={ selectedTab === "posts" ? "selected-tab" : "" }
                >
                    <img alt="" src={ gridIcon } /> POSTS
                </span>
                    {
                        props.profileUserInfo.userId === userInfo.userId
                            ? <span 
                                onClick={ () => setSelectedTab("saved") }
                                className={ selectedTab === "saved" ? "selected-tab" : "" }
                              >
                                <img alt="" src={ bookmarkIcon } /> SAVED
                              </span>
                            : ""
                    }
                <span 
                    onClick={ () => setSelectedTab("tagged") }
                    className={ selectedTab === "tagged" ? "selected-tab" : "" }    
                >
                    <img alt="" src={ tagIcon } /> TAGGED
                </span>
            </div>
            {
                selectedTab === "posts"
                    ? <ProfilePosts
                        posts={ props.posts }
                      />
                    : ""
            }
            {
                selectedTab === "saved"
                    ? <ProfileSaves />
                    : ""
            }
        </div>
    )
}