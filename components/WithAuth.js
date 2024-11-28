import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Redirect if not authenticated
    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to login page
      }
    }, [isAuthenticated, router]);

    // If not authenticated, return null (or loading state)
    if (!isAuthenticated) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="loading loading-spinner loading-lg text-indigo-500"></div>
        </div>
      );
    }

    // If authenticated, return the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
