import { FC, memo, useState } from 'react';
import PostItem from './Post/PostItem';
import AddingNewPost from './Post/AddingNewPost/AddingNewPost';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/ReduxStore';

const Posts: FC = () => {
    const postItem = useSelector((state: RootState) => state.ProfilePage.PostItem);

    const [openPost, setOpenPost] = useState<boolean>(false);

    const PostElem = [...postItem].reverse().map(post => <PostItem post={post} openPost={openPost}
        setOpenPost={(openPost: boolean) => { setOpenPost(openPost) }} />);
    return <div>
        <AddingNewPost />
        <div>
            {PostElem}
        </div>
    </div>

}

export default memo(Posts);