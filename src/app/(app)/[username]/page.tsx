import { RESERVED_ROUTES } from "@/config/routes";

type ProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { username } = await params;

  if (RESERVED_ROUTES.has(username.toLowerCase())) {
    return <div>404 Not Found</div>;
  }

  return <div>ProfilePage {username}</div>;
};
export default ProfilePage;
