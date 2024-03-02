import React, { memo, useState } from 'react';
import styles from "./AnswerItem.module.css";
import user from "../../../../../../assets/Profile/usersProfileIcon.png";
import { acceptAnswerChanges, deleteAnswer } from "../../../../../../redux/ProfileReducer";
import { useDispatch } from "react-redux";
import AnswerInterections from "./AnswerInterectionsBlock/AnswerInterections";
import { answersType } from "../../../../../../types/types";
import details from "../../../../../../assets/AdditionalyPhoto.png"


type Props = {
    answer: answersType
    currentUserId: number
    answerMode: boolean
    postId: number
    setAnswerMode: any
}

function AnswerItem({ answer, ...props }: Props) {
    let [editMode, setEditMode] = useState(false);
    let [answerMessage, setAnswerMessage] = useState(answer.answerMessage);
    const dispatch = useDispatch();

    return <div key={answer.id} className={styles.answerItem}>
        <div className={styles.imageBlock}>
            <img className={styles.answerImg}
                src={answer.usersImage || user} alt="" />
        </div>
        <div className={styles.commentBlock}>
            <div className={styles.fullName}>
                {answer.answerName}
                <span className={styles.detailsBlock}>
                <button className={styles.details}><img src={details} /></button>
            </span>
            </div>
            {editMode && props.currentUserId === answer.userId ? <div>
                <input value={answerMessage} onChange={(event) => {
                    setAnswerMessage(event.target.value)
                }} autoFocus={true} />
                <button onClick={() => {
                    dispatch(acceptAnswerChanges({ answerId: answer.id, newMessage: answerMessage, postId: props.postId }));
                    setEditMode(false)
                }}>Принять</button>
            </div> :
                <div className={styles.answerMessage}>
                    {answer.answerMessage}
                </div>
            }
            <span>
                <AnswerInterections answerMode={props.answerMode} setAnswerMode={props.setAnswerMode}
                    answerId={answer.id} likesCount={answer.likesCount} postId={props.postId} />
            </span>
        </div>
    </div>
}

export default memo(AnswerItem);