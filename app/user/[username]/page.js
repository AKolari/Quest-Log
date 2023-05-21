import Profile from "@/components/Profile";

const Page = ({ params: { username } }) => {
  return <Profile username={username}></Profile>;
};
export default Page;
