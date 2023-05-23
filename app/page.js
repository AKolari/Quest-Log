import ProfilePartial from "@/components/ProfilePartial";
import { getLatestUsers } from "@/utils/apiFunctions";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 20;

export default async function Home() {
  const userProfiles = await getLatestUsers(3);

  if (userProfiles.error) {
    return <>ERROR </>;
  }

  if (userProfiles.data.length === 0) {
    return <p>No users have signed up yet</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      {userProfiles.data.map(({ username, id }) => {
        return (
          <>
            <div className="border-white border-dotted border-2 p-2 m-5 grid grid-cols-2 self-center justify-items-center ">
              <Link
                key={username}
                href={`/user/${username}`}
                className="block m-4 p-6 h-32 w-48 button small text-center text-white  self-center bg-blue-600 border-white border-4 text-3xl border-double "
              >
                {username}
              </Link>
              <ProfilePartial id={id} username={username}></ProfilePartial>
            </div>
          </>
        );
      })}
    </main>
  );
}
