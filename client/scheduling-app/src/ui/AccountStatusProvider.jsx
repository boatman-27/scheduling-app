import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

import AppLayout from "./AppLayout";
import Error from "./Error";
import Loader from "./Loader";

import { checkStatus } from "../services/apiAccount";
import Navbar from "./Navbar";

const AccountStatusProvider = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["accountStatus"],
    queryFn: checkStatus,
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-stone-500">
        <Navbar context={{ accountStatus: false, user: null }} />
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-stone-500">
        <Navbar context={{ accountStatus: false, user: null }} />
        <Error error={error.message} />
      </div>
    );
  }

  const accountStatus = data?.loggedIn;
  const user = data?.user;

  return (
    <AppLayout context={{ accountStatus, user }}>
      <Outlet context={{ accountStatus, user }} />
    </AppLayout>
  );
};

export default AccountStatusProvider;
