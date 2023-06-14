import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import {fetchComments} from "../store/actions/postsActions";
import IPost from "../models/IPost";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import ListComments from "./ListComments";

interface ListCommentsProps {
    post: IPost
}

const SectionComments = ({post}: ListCommentsProps) => {

    const [visibleComments, setVisibleComments] = useState(false);
    const {commentsByPost, isLoading, error} = useAppSelector(state => state.comment)
    const dispatch = useAppDispatch();

    const handlerGetComments = () => {
        if(!visibleComments)
            dispatch(fetchComments(post.id.toString()));

        setVisibleComments(!visibleComments);
    }

    const handlerGetCommentsAgain = () => {
        dispatch(fetchComments(post.id.toString()));
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {visibleComments &&
                <ListComments comments={commentsByPost}/>
            }
            <Button
                style={{maxWidth: 150, fontSize: 18, marginTop: 10}}
                variant="outline-secondary"
                disabled={isLoading}
                onClick={handlerGetComments}
            >
                {isLoading
                    ? 'Loading…'
                    : (!visibleComments ? 'Comments' : 'Hide')
                }
            </Button>
        </div>
    );
};

export default SectionComments;