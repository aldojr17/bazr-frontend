import userService from "../api/service/user";

const useUser = () => {
  const fetchProfile = async () => {
    const response = await userService.fetchProfile();

    if (response.is_success) {
      return response.data;
    }

    return null;
  };

  return {
    fetchProfile,
  };
};

export default useUser;
