import { useState, useEffect } from "react"
import { handleError } from "../../helpers";
import PostDataService from "../../services/PostDataService"
import ProfilePost from "./ProfilePost";

export default function ProfileSaves(props) {
    const [saves, setSaves] = useState([]);

    useEffect(() => {
        PostDataService.getSaves()
            .then(response => {
                const postsList = response.data.saves.map(element => {
                    return PostDataService.getPostById(element.postId)
                });

                Promise.all(postsList)
                    .then(response => {
                        setSaves(response.map(element => {
                            return <ProfilePost
                                        key={ element.data._id }
                                        postInfo={ element.data }
                                   />
                        }));
                    });
            })
    }, [])

    return (
        <div className="profile-page-images">
            { saves }
            <div id="empty" />
        </div>
    )
}