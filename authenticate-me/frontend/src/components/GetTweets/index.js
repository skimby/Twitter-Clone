import TweetSettingsModal from './TweetSettingsModal';
import { Redirect, useHistory, Link } from 'react-router-dom';
import UserProfile from '../UserProfile';
import './GetTweets.css'


function GetTweets({ tweets }) {
    const history = useHistory();

    // if (tweets)

    return (
        <>
            {tweets && (
                Object.values(tweets).map((tweet, index) => {
                    return (
                        <div className='tweet-container' key={index} >

                            <div className='profile-img'>
                                <Link to={{
                                    pathname: `/${tweet?.User?.username}`,
                                    state: {
                                        userPageId: tweet?.User?.id
                                    }
                                }}>

                                    <img className='profile-img' src={tweet?.User?.profileImage} />

                                </Link>
                            </div>
                            <div className='tweet-text-box'>
                                <div>
                                    <Link to={{
                                        pathname: `/${tweet?.User?.username}`,
                                        state: {
                                            userPageId: tweet?.User?.id
                                        }
                                    }}>
                                        <h5>{tweet?.User?.firstName}  </h5>
                                    </Link>
                                    {/* <h5><span className='thin-styling'>@{tweet?.User?.username} • {tweet?.updatedAt[1]} {tweet?.updatedAt[2]}</span></h5> */}
                                </div>

                                <div>

                                    <Link to={`/tweets/${tweet.id}`}>
                                        <p>{tweet?.tweet}</p>
                                    </Link>
                                </div>


                                <div className='settings-btn' >
                                    <TweetSettingsModal tweet={tweet} />
                                </div>

                            </div>
                            <div className='tweet-icons-box'>
                                <div>
                                    <i className="fa-regular fa-comment"></i>{tweet?.commentCount}
                                </div>
                                <div>
                                    <i className="fa-solid fa-retweet"></i>{tweet?.retweetCount}
                                </div>
                                <div>
                                    <i className="fa-regular fa-heart"></i>{tweet?.commentCount}
                                </div>
                            </div>
                        </div>

                    )
                })
            )}
        </>
    )
}

export default GetTweets;
