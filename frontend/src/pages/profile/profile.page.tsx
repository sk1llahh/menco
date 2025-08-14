import useProfile from "@/entities/user/model/useProfile";

const Page = () => {
  const { getProfile } = useProfile();

  return <h1>profile</h1>;
};

export const Component = Page;
