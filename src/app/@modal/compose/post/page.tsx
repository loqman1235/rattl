import { ComposePostModal } from "@/components/modals/compose-post-modal";
import { getCurrentUser } from "@/lib/auth/session";

const CreatePostPage = async () => {
  const user = await getCurrentUser();

  if (!user) return null;

  return <ComposePostModal user={user} />;
};
export default CreatePostPage;
