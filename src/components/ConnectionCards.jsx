import { AnimatedConnections } from "@/components/ui/animated-connections";
import connectionStore from "@/stores/connectionStore";
import userStore from "@/stores/userStore";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import NotLoggedIn from "./NotLoggedIn";

export default function ConnectionCards() {

  const { connections, setConnections } = connectionStore();
  const user = userStore(state => state.user)
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
      setConnections(res?.data?.data);
    } catch (error) {
      console.log("Backend response:", err.response?.data);
      console.log("Error:", err.message);
    }
  }

  useEffect(() => {
    if (user) {
      fetchConnections();
    }
  }, [user])

  if (!connections) {
    if (!user) {
      return (
        <NotLoggedIn />
      )
    }
    else {
      return (
        <div >
          <div className='font-semibold text-5xl mask-t-from-neutral-100 text-center'>
            Loading...
          </div>
        </div>
      )
    }
  }

  if (connections.length === 0) {
    return (
      <div className='text-center mt-10 text-4xl'>
        <h1>No Connection found</h1>
      </div>
    );
  }

  const connectionProp = connections.map((connection) => ({
    _id: connection._id,
    about: connection.about,
    firstName: connection.firstName,
    lastName: connection.lastName,
    age: connection.age,
    gender: connection.gender,
    src: connection.photoUrl,
  }));



  return <AnimatedConnections testimonials={connectionProp} />;
}
