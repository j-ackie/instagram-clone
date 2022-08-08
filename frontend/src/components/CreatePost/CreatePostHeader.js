export default function CreatePostHeader(props) {
    let headers = [];
    for (const header of props.headers) {
        headers.push(
            <span>
                { header }
            </span>
        )
    }
    return (
        <div id="create-post-header">
            { headers }
        </div>
    )
}