import PostDataService from "./services/PostDataService";
import DefaultProfilePicture from "./icons/DefaultProfilePicture.png";

export default function loadPost(postInfo, setProfilePicture, setUsername, setComments, setLikes) {
    PostDataService.getUserById(postInfo.userId)
        .then(response => {
            if (response.data.profilePicture) {
                setProfilePicture(response.data.profilePicture);
            }
            else {
                setProfilePicture(DefaultProfilePicture);
            }
            setUsername(response.data.username);
        });
    PostDataService.getComments(postInfo._id)
        .then(response => {
            
            setComments(response.data.comments);
        });
    PostDataService.getLikesById(postInfo._id)
        .then(response => {
            setLikes(response.data);
        });
}

export function renderTimestamp(timestamp) {
    timestamp = new Date(timestamp);
    const msInHour = 1000 * 60 * 60;
    const timePassed = new Date() - timestamp;
    let hoursPassed = timePassed / msInHour;
    
    if (hoursPassed < 1) {
        let minsPassed = Math.round(hoursPassed * 60);
        return minsPassed + " MINUTES AGO";
    }
    else if (hoursPassed >= 1 && hoursPassed <= 24) {
        hoursPassed = Math.round(hoursPassed);
        if (hoursPassed === 1) {
            return hoursPassed + " HOUR AGO";
        }
        return hoursPassed + " HOURS AGO";
    }
    else {
        let daysPassed = hoursPassed / 24;
        if (daysPassed <= 7) {
            daysPassed = Math.round(daysPassed);
            if (daysPassed === 1) {
                return daysPassed + " DAY AGO";
            }
            return daysPassed + " DAYS AGO"
        }
        else {
            // TODO: Format string
            return timestamp.toDateString();
        }
    }
}

export function resetUserInfo(setUserInfo) {
    setUserInfo({
        userId: "",
        username: "",
        profilePicture: "",
        bio: ""
    });
}

export function handleError(error, functions) {
    const message = error.response.data.error;
    if (message === "jwt expired" || message === "not logged in") {
        functions.navigate("/login");
        resetUserInfo(functions.setUserInfo);
        return;
    }

    console.error("error");
}

export function isLoggedIn(userInfo) {
    return userInfo.userId !== "";
}