import { auth } from "../../firebase.config";

export const getAuthHeaders = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be logged in to continue.");
  }

  const token = await user.getIdToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
