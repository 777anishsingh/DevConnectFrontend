import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import userStore from "@/stores/userStore";

const NotFound = () => {
    const user = userStore(state => state.user);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-7xl font-bold">404</h1>

            <p className="text-2xl mt-4">
                Page Not Found
            </p>

            <p className="mt-2">
                The page you're looking for doesn't exist.
            </p>
            <Button className={"bg-white cursor-pointer mt-3 text-black"}>
                <Link to={!user ? "/login" : "/feed"}>Go Back</Link>
            </Button>
        </div>
    );
};

export default NotFound;