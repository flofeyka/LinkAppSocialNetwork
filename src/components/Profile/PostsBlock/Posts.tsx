import React, { memo, useState } from 'react';
import PostItem from './Post/PostItem';
import AddingNewPost from './Post/AddingNewPost/AddingNewPost';
import { postItemType } from "../../../types/types";

type Props = {
    PostItem: Array<postItemType>
    currentUserId: number
    currentFullName: string
    currentProfileImage: {
        small: string
        large: string
    }
}

function Posts(props: Props) {
    const [openPost, setOpenPost] = useState<boolean>(false);

    const PostElem = [...props.PostItem].reverse().map(post => <PostItem post={post}
        currentFullName={props.currentFullName} currentUserId={props.currentUserId} 
        currentProfileImage={props.currentProfileImage.small} setOpenPost={setOpenPost}/>)
    return <div>
        <AddingNewPost currentUserId={props.currentUserId} currentFullName={props.currentFullName} currentProfileImage={props.currentProfileImage.large} />
        <div>
            {PostElem}
        </div>
    </div>

}

export default memo(Posts);