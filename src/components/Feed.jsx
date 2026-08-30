import feedStore from '@/stores/feedStore';
import { BASE_URL } from '@/utils/constants';
import axios from 'axios';
import React, { useEffect } from 'react'
import { UserCard } from './UserCard';
import userStore from '@/stores/userStore';
import NotLoggedIn from './NotLoggedIn';


const Feed = () => {
  const user = userStore(state => state.user)

  if (!user) {
    return (
      <NotLoggedIn />
    )
  }


  const { setFeed, feed } = feedStore()
  const getFeed = async () => {
    if (feed != null) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      setFeed(res?.data?.allowedUsersInFeed);
      // console.log(res?.data?.allowedUsersInFeed);
    } catch (err) {
      console.log("Backend response:", err.response?.data);
      console.log("Error:", err.message);
    }
  }

  useEffect(() => {
      getFeed();
  }, [user])


  if (feed === null) {

    return (
      <div >
        <div className='font-semibold text-5xl mask-t-from-neutral-100 text-center'>
          Loading...
        </div>
      </div>
    )
  }

  if (feed.length === 0) {
    return (
      <div className='font-semibold text-5xl mask-t-from-neutral-100 text-center'>
        No new user found
      </div>
    )
  }

  return (
    feed && (
      <>
        <div className='font-semibold mb-3 text-5xl mask-t-from-neutral-100 text-center'>My Feed</div>
        <div>
          {feed?.[0] && <UserCard user={feed[0]} />}
        </div>
      </>
    )
  )
}

export default Feed