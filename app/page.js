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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {userProfiles.data.map(({ username }) => {
        return (
          <Link
            key={username}
            href={`/user/${username}`}
            className="block my-5 button small"
          >
            {username}
          </Link>
        );
      })}
    </main>
  );
}
