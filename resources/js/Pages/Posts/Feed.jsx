import Posts from "@/Components/Posts/All";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CreateButton from "@/Components/CreateButton";

export default function Feed({ posts, auth }) {
  return (
    <div>
      <AuthenticatedLayout 
        user={auth.user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Post Feed</h2>
            <CreateButton to="/posts/create" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Create Post
            </CreateButton>
          </div>
        }
      >
        <Posts posts={posts} user_id={auth.user.id} />
      </AuthenticatedLayout>
    </div>
  );
}
