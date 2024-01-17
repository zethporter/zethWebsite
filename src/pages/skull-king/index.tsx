import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import ky from "ky";
import { useQuery } from "@tanstack/react-query";

const userQueryFunction = async () => {
  const res = await ky.get(`/api/user`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const SkullKing = () => {
  const { user, isLoaded } = useUser();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => userQueryFunction(),
    enabled: isLoaded,
  });

  console.log("User", user);

  if (isPending) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  console.log("Data", data);
  return (
    <header
      style={{ display: "flex", justifyContent: "space-between", padding: 20 }}
    >
      <h1>My App</h1>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </header>
  );
};

export default SkullKing;
