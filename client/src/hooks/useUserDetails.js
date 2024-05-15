import { useEffect, useState } from "react";

const useUserDetails = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5001/api/user", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const result = await response.json();
        setUser(result);
      } catch (error) {
        setIsError(true);
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchUser();
    }
  }, []);

  return { user, isLoading, isError };
};

export default useUserDetails;
