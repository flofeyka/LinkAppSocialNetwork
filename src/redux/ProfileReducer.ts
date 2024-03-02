import { stat } from "fs";
import {ProfileAPI, UsersAPI} from "../API/api";
import {postItemType, profileDataType, profileType} from "../types/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profileData: {
            photos: {
                large: null,
                small: null
            }
        } as profileDataType,
        currentUserId: null,
        isFetching: true,
        PostItem: [] as Array<postItemType>,
        status: null,
        isFollowing: null,
        followingInProgress: null
    } as profileType,
    reducers: {
        addPost: (state, action) => {
            let {userId, fullName, currentProfileImage, NewPostMessage, likesCount, isLiked} = action.payload
            state.PostItem.push({
                id: state.PostItem.length + 1,
                userId: userId,
                fullName: fullName,
                usersPhoto: currentProfileImage,
                postMessage: NewPostMessage,
                likesCount: likesCount,
                isLiked: isLiked,
                answers: []
            })
        },
        answerComment: (state, action) => {
            let {id, name, image, userId, message, isLiked, likesCount} = action.payload
            state.PostItem.forEach(post => {
                if (post.id === id) {
                    post.answers.push({
                        id: post.answers.length + 1,
                        postId: id,
                        answerName: name,
                        usersImage: image,
                        userId: userId,
                        answerMessage: message,
                        isLiked: isLiked,
                        likesCount: likesCount
                    });
                }
                ;
            });
        },
        setLikeAnswer: (state, action) => {
            state.PostItem.forEach(post => {
                post.answers.forEach(answer => {
                    if (answer.id === action.payload.answerId && post.id === action.payload.postId) {
                        answer.likesCount = !answer.isLiked ? answer.likesCount + 1 : answer.likesCount - 1;
                        answer.isLiked = !answer.isLiked;
                    }
                    ;
                });
            });
        },
        setLike: (state, action) => {
            state.PostItem.forEach(post => {
                if (post.id === action.payload) {
                    post.likesCount = !post.isLiked ? post.likesCount + 1 : post.likesCount - 1;
                    post.isLiked = !post.isLiked;
                }
            });
        },
        acceptCommentChanges: (state, action) => {
            state.PostItem.forEach(post => {
                post.postMessage = post.id === action.payload.id ? action.payload.newMessage : post.postMessage;
            });
        },
        deleteComment: (state, action) => {
            state.PostItem.splice(action.payload - 1, 1);
        },
        acceptAnswerChanges: (state, action) => {
            state.PostItem.forEach(post => {
                post.answers.forEach(answer => {
                    answer.answerMessage = answer.id === action.payload.answerId && post.id === action.payload.postId
                        ? action.payload.newMessage : answer.answerMessage;
                })
            })
        },
        deleteAnswer: (state, action) => {
            state.PostItem.forEach(post => {
                post.answers.splice(action.payload - 1, 1);
            });
        }
    }, extraReducers: (builder) => {
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profileData = action.payload;
        })
        builder.addCase(setStatusProfile.fulfilled, (state, action) => {
            state.status = action.payload;
        })
        builder.addCase(getFollowingData.fulfilled, (state, action) => {
            state.isFollowing = action.payload;
        })
        builder.addCase(getStatus.fulfilled, (state, action) => {
            action.payload ? state.status = action.payload : state.status = "Статус отсутствует :)";
        })
        builder.addCase(Follow.pending, (state, action) => {
            state.followingInProgress = true;
        })
        builder.addCase(Follow.fulfilled, (state, action) => {
            state.isFollowing = true;
            state.followingInProgress = false;
        })
        builder.addCase(unFollow.pending, (state, action) => {
            state.followingInProgress = true;
        })
        builder.addCase(unFollow.fulfilled, (state, action) => {
            state.isFollowing = false;
            state.followingInProgress = false;
        })
        builder.addCase(editProfile.fulfilled, (state, action) => {
            state.profileData = action.payload;
        })
    }
});

export const {
    addPost, answerComment, setLikeAnswer,
    setLike, acceptCommentChanges, deleteComment, acceptAnswerChanges, deleteAnswer
} = profileSlice.actions;

export const getStatus = createAsyncThunk("profile/getStatus", async (userId: number) => {
    let Response = await ProfileAPI.getProfileStatus(userId);
    return Response.data;
}
) 
export const getProfile = createAsyncThunk('profile/getProfile', async(userId: number, ThunkAPI) => {
    const Response = await ProfileAPI.getUserProfile(userId)
    return Response.data;
});

export const setStatusProfile = createAsyncThunk('profile/setStatus', async (status: string | null, ThunkAPI) => {
    const Response = await ProfileAPI.setProfileStatus(status);
    return Response.data
})

export const getFollowingData = createAsyncThunk('profile/getFollowingData', async (userId: number) => {
    let Response = await ProfileAPI.getFollowingData(userId);
    return Response.data;
}
) 
export const Follow = createAsyncThunk('profile/follow', async (id: number) => {
    let Response = await UsersAPI.follow(id);
    return Response.data;
})

export const unFollow = createAsyncThunk('profile/unfollow', async (id: number) => {
    let Response = await UsersAPI.unfollow(id);
    return Response.data;
});

export const editProfile = createAsyncThunk('profile/editProfile', async (data: any) => {
    let Response = await ProfileAPI.editProfileData(data);
    return Response.data;
})


export default profileSlice.reducer;