import Posts from "@/Components/Posts/All";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Feed({ posts, auth }) {
  return (
    <div>
      <AuthenticatedLayout user={auth.user}>
      <h1>Posts</h1>
      <Posts posts={posts} />
      </AuthenticatedLayout>
    </div>
  );
}