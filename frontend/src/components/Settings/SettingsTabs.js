import { useLocation, Link } from "react-router-dom"

export default function SettingsTabs(props) {
    const { pathname } = useLocation();

    return (
        <div id="settings-tabs">
            <Link to="/settings/edit" className={ pathname.includes("edit") ? "bolded" : "" }>
                <span>
                    Edit profile
                </span>
            </Link>
            <Link to="/settings/activity" className={ pathname.includes("activity") ? "bolded" : "" }>
                <span>
                    Activity
                </span>
            </Link>
        </div>
    )
}