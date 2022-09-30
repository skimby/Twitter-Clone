import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { getFollowingBackend, getLoggedUserFollowingBackend } from '../../store/follow';
import { getUserBackend } from '../../store/user';
import EachFollow from './EachFollow';


function GetFollowsPage({ followingCount }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();

    const [isOwnPage, setIsOwnPage] = useState();

    const user = useSelector(state => state.users)
    const loggedUser = useSelector(state => state.session.users)
    const follows = useSelector(state => state.follows);
    const following = Object.values(follows?.following);


    useEffect(() => {
        dispatch(getUserBackend(userId))
    }, [dispatch, userId])

    useEffect(() => {
        if (parseInt(userId) === loggedUser?.id) {
            setIsOwnPage(true)
        } else {
            setIsOwnPage(false)
        }
    }, [dispatch, userId])

    useEffect(() => {
        dispatch(getFollowingBackend(userId))
        dispatch(getLoggedUserFollowingBackend())
    }, [dispatch])

    const handleBack = () => {
        history.goBack();
    }

    return (
        <>
            <div className="middle-container">
                <div>
                    <div>
                        <i className="fa-solid fa-arrow-left-long" onClick={handleBack}></i>
                    </div>
                    <div>
                        <h3>{user?.User?.firstName}</h3>
                        <h5>@{user?.User?.username}</h5>
                    </div>

                    <div>
                        <h4>Following</h4>
                        {following && (
                            following.map((follow, index) => {
                                return (
                                    <div key={index}>
                                        <EachFollow follow={follow} isOwnPage={isOwnPage} />
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default GetFollowsPage;
