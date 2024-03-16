<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;
use App\Models\Image;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{

    public function index()
    {
        $user = auth()->user();
        $posts = Post::with('images')->get();

        return Inertia::render('Posts/Index', ['posts' => $posts, 'user_id' => auth()->id()]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'uuid' => 'required|uuid',
        ]);

        $post = new Post();
        $post->title = $request->title;
        $post->body = $request->body;
        $post->user_id = auth()->id();
        $post->uuid = $request->uuid;

        $post->save();

        Image::where('imageable_id', $request->uuid)->where('is_temp', true)->update([
            'imageable_type' => 'App\Models\Post',
            'imageable_id' => $post->id,
            'is_temp' => false,
        ]);


        return Inertia::location(route('posts.index'));
    }


    public function create()
    {
        return Inertia::render('Posts/CreateForm');
    }

    public function show($id)
    {
        $post = Post::with('images')->findOrFail($id);
        return Inertia::render('Posts/Post', [
            'post' => $post
        ]);
    }

    public function update(Request $request, $id)
    {
        Log::info("Post Controller Update");
        Log::info($request->all());
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);
        $post = Post::findOrFail($id);

        $post->update($request->all());

        return Inertia::location(route('posts.index'));
    }

    public function edit($id)
    {
        $post = Post::with('images')->findOrFail($id);
        Log::info("Post Controller edit");
        Log::info($post);
        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return redirect()->route('posts.index')->with('message', 'Post deleted successfully.');
    }
}
