export default function CreatePostHeader(props) {
    let headers = [];
    
    for (const header of props.headers) {
        headers.push(
            <span>
                { header }
            </span>
        )
    }
    if (props.headers.length === 1) {
        headers.unshift(<span />);
        headers.push(<span />);
    }
    return (
        <div id="create-post-header">
            { headers }
        </div>
    )
}