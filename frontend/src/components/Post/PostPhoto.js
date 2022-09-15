import { useState } from "react";
import Arrows from "../Arrows/Arrows";
import PageIndicator from "../PageIndicator/PageIndicator";

export default function PostPhoto(props) {
    return (
        <div className="post-photo-container">
            <img 
                className="post-photo"
                alt="Post"
                src={ props.files[props.currImageIndex] }
            />
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