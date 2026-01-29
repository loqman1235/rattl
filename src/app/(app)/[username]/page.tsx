import { RESERVED_ROUTES } from "@/config/routes";
import { notFound } from "next/navigation";

type ProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { username } = await params;

  if (RESERVED_ROUTES.has(username.toLowerCase())) {
    return notFound();
  }

  return <div>ProfilePage {username}</div>;
};
export default ProfilePage;
