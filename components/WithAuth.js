import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const withAuth = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Redirect if not authenticated
    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to login page
      }
    }, [isAuthenticated, router]);

    // Show a loading spinner while redirecting
    if (!isAuthenticated) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="loading loading-spinner loading-lg text-indigo-500"></div>
        </div>
      );
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };

  // Set the display name for debugging purposes
  EnhancedComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return EnhancedComponent;
};

export default withAuth;
