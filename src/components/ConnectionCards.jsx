import { AnimatedConnections } from "@/components/ui/animated-connections";
import connectionStore from "@/stores/connectionStore";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";

export default function ConnectionCards() {

  const { connections, setConnections } = connectionStore();
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
    fetchConnections();
  }, [])

  if (!connections) return;

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
