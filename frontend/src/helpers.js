export default function renderTimestamp(timestamp) {
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
}

export function isLoggedIn(userInfo) {
    return userInfo.userId !== "";
}

export function isFilesValid(files) {
    const fileSizeLimit = 50 * 1024 * 1024; // 50 MB

    if (files.length > 10) {
        alert("maximum files is 10");
        return false;
    }

    for (const file of files) {
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            alert("incompatible file type");
            return false;
        }
        if (file.size > fileSizeLimit) {
            alert(`${file.name} is too large`);
            return false;
        }
    }

    for (const file of files) {
        file.filename = Math.random().toString(36).slice(2);
    }

    return true;
}