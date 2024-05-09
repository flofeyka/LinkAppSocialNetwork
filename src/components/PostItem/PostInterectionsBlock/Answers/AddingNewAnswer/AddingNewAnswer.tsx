import { FC } from "react";
import user from "../../../../../assets/Profile/usersProfileIcon.png";
import {useFormik} from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { Button, Input } from "@nextui-org/react";
import { RootState, useAppDispatch } from "../../../../../redux/store";
import { answerComment } from "../../../../../redux/profileSlice";


const AddingNewAnswer: FC<{postId: number}> = ({postId}) => {
    const [currentUserId, name, image] = useSelector((state: RootState) => [
        state.AuthPage.userId,
        state.AuthPage.login,
        state.AuthPage.currentProfileImage.large
    ])
    const dispatch = useAppDispatch();
    console.log(currentUserId, name, image)

    const formik = useFormik({
        initialValues: {
            answerMessage: ""
        },
        validationSchema: Yup.object().shape({
            answerMessage: Yup.string().trim().required()
        }),
        onSubmit: values => {
            dispatch(answerComment({
                id: postId, userId: currentUserId, name,
                image, message: values.answerMessage
            }
        ));
            values.answerMessage = "";
        }
    })

    return <form onSubmit={formik.handleSubmit}>
        <div className="flex">
            <span>
            <img className="max-w-[40px] max-h-10 rounded-full"
                 src={image || user} alt="" />
            </span>
            <span>
                <Input name={"answerMessage"} className="text-[25px] rounded-[10px]" autoFocus={true}
                       onChange={formik.handleChange} value={formik.values.answerMessage}/>
            </span>
            <Button type="submit" className="w-[50px] h-10 rounded-[10px] border-[none]">Send</Button>
        </div>
    </form>
}

export default AddingNewAnswer;