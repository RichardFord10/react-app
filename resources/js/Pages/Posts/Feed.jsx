import Posts from "@/Components/Posts/All";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Feed({ posts, auth }) {
  return (
    <div>
            <AuthenticatedLayout user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Post Feed</h2>}>
      <Posts posts={posts} />
      </AuthenticatedLayout>
    </div>
  );
}