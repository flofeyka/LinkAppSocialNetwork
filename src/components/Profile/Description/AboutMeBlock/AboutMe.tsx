import styles from "./AboutMe.module.css";
import {useState} from "react";
import closer from "./../../../../assets/Closer.png"
import {NavLink} from "react-router-dom";
import AboutMeEdit from "./AboutMeEdit/AboutMeEdit";

type Props = {
    fullName: string
    LinkedUserId: number
    contacts: {
        github: string | null
        vk: string | null
        facebook: string | null
        instagram: string | null
        twitter: string | null
        website: string | null
        youtube: string | null
        mainLink: string | null
    } | any
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    currentUserId: number
    aboutMe: string | null
    profileData: any
}

function AboutMeBlock({LinkedUserId, contacts, ...props}: Props) {
    let [deploy, setDeploy] = useState<boolean>(false);
    let [editMode, setEditMode] = useState<boolean>(false);


    return <div className={styles.AboutMeBlock}>
        <div>
            <button className={styles.aboutMeButton} onClick={() => {
                !deploy ? setDeploy(true) : setDeploy(false);
            }}>Основные данные
            </button>
            {deploy && <div className={styles.aboutMeContainer}>
                <div className={styles.aboutMe}>
                    <div className={styles.closeBlock}>
                        <button className={styles.closeButton} onClick={() => {
                            setDeploy(false);
                            setEditMode(false);
                        }}>
                            <img className={styles.closer} src={closer} alt=""/>
                        </button>
                    </div>
                    {!editMode && <div className={styles.Description}>
                        <div>
                            <h3>Основные данные</h3>
                            <li><b>Имя</b>: {props.fullName}</li>
                            <li><b>Пользовательская ссылка</b>: <NavLink
                                to={`/user/${LinkedUserId}`}>linkapp.com/user/{LinkedUserId}</NavLink></li>
                            <li><b>Уникальный айди</b>: {LinkedUserId}</li>
                            <li><b>Обо мне</b>: <span className={styles.aboutMeText}>{props.aboutMe}</span></li>
                        </div>
                        {!props.lookingForAJob || <div>
                            <h3>Я ищу работу.</h3>
                            <li>{props.lookingForAJobDescription}</li>
                        </div>
                        }
                        <div className={styles.contacts}>
                            {Object.keys(contacts).every(item => !item) && <div className={styles.otherSocial}>
                                <h3>Другие социальные сети</h3>
                                {Object.keys(contacts).map(item => {
                                    if (contacts[item] != null ) return <li key={item}><b>{item}</b>: <a
                                        href={"https://" + contacts[item]}>{contacts[item]}</a></li>
                                    return null;
                            })}
                            </div>
                            }
                        </div>
                        {props.currentUserId === LinkedUserId && <span>
                                <button onClick={() => {
                                    setEditMode(true)
                                }}>Редактировать
                                </button>
                            </span>
                        }

                    </div>}
                    {editMode && <AboutMeEdit currentUserId={props.currentUserId} profileData={props.profileData}
                                              LinkedUserId={LinkedUserId}
                                              editMode={editMode} setEditMode={(editMode: boolean) => {
                        setEditMode(editMode)
                    }}/>}
                </div>
            </div>}
        </div>
    </div>
}

export default AboutMeBlock;