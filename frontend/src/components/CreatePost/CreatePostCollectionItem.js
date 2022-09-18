import { Reorder, motion } from "framer-motion";

export default function CreatePostCollectionItem(props) {
    const image = (
        <img
            alt="Post"
            draggable="false"
            index={ props.index }
            className="create-post-collection-image"
            src={ URL.createObjectURL(props.file) }
            onClick={ props.handleClick }
        />
    )

    return (
        <Reorder.Item
            value={ props.file }
            animate={{
                y: 0,
                transition: {duration: 0.15}
            }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
        >
            <motion.span layout="position">
                { image }
            </motion.span>
        </Reorder.Item>
    )
}