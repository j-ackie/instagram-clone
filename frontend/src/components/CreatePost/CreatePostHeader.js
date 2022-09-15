import BackIcon from "../Icons/BackIcon";

export default function CreatePostHeader(props) {
    let headers = [];
    
    if (props.files.length === 0) {
        headers = [
            <span className=""/>,
            <span>Create new post</span>,
            <span className=""/>
        ];
    }
    else if (!props.isCropped) {
        headers = [
            <BackIcon onClick={ () => props.setFiles([]) }/>,
            <span>Crop</span>,
            <span onClick={ () => props.setIsCropped(true) } className="action">Next</span>
        ];
    }
    else {
        headers = [
            <BackIcon onClick={ () => props.setIsCropped(false) } />,
            <span>Create new post</span>,
            <span onClick={ props.handleShare } className="action">Share</span>
        ];
    }

    headers[0] = (
        <div key="0" id="left-header">
            { headers[0] }
        </div>
    );

    headers[1] = (
        <div key="1" id="center-header">
            { headers[1] }
        </div>
    );

    headers[2] = (
        <div key="2" id="right-header">
            { headers[2] }
        </div>
    );

    return (
        <div id="create-post-header" className="popup-header">
            { headers }
        </div>
    )
}