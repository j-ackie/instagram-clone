import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../helpers";
import UserDataService from "../../services/UserDataService";
import UserContext from "../../UserProvider";
import ActivityAction from "./ActivityAction";

export default function ActivityIconPopup(props) {
    const [activity, setActivity] = useState([]);
    const [userInfo, setUserInfo] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        UserDataService.getActivity(userInfo.userId)
            .then(response => {
                let activityList = [];
                for (const action of response.data.activity) {
                    activityList.push(
                        <ActivityAction
                            key={ action._id }
                            action={ action }
                            setIsActivityIconClicked={ props.setIsActivityIconClicked }
                        />
                    )
                }
                setActivity(activityList);
            })
            .catch(err => {
                handleError(err, { navigate, setUserInfo });
            });
    }, [navigate, setUserInfo, userInfo.userId, props.setIsActivityIconClicked]);

    return (
        <div id="activity-icon-popup" className="navbar-pop-up">
            <span>Recent activity</span>
            { activity }
        </div>
    )
}