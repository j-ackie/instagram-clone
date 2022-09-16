import { useEffect, useState } from "react";
import Arrows from "../Arrows/Arrows";
import PageIndicator from "../PageIndicator/PageIndicator";

export default function PostPhoto(props) {
    const [maxHeight, setMaxHeight] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let height = 0;
        props.files.forEach((file, index) => {
            let img = new Image();
            img.src = file;
            img.addEventListener("load", () => {
                const scale = props.width / img.width;

                if (img.height * scale > height) {
                    height = img.height * scale;
                    setMaxHeight(height);
                }
                if (index === props.files.length - 1) {
                    setIsLoading(false);
                }
            });
        });

    }, [props.width, props.files]);

    return (
        <div className="post-photo-container" style={ {"height": maxHeight, "width": props.width} }>
            {
                !isLoading
                    ? <img
                        className="post-photo"
                        alt="Post"
                        src={ props.files[props.currImageIndex] }
                      />
                    : ""
            }
            {
                props.showPageIndicator
                    ? <PageIndicator
                        length={ props.files.length }
                        currImageIndex={ props.currImageIndex }
                      />
                    : ""
            }
            <Arrows
                length={ props.files.length }
                currImageIndex={ props.currImageIndex }
                setCurrImageIndex={ props.setCurrImageIndex }
            />
        </div>
    )
}