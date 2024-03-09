<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;
use App\Models\Image;

class PostController extends Controller
{

    public function index()
    {
        $posts = Post::with('images')->get();

        return Inertia::render('Posts/Feed', ['posts' => $posts, 'user_id' => auth()->id()]);
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

        Image::where('uuid', $request->uuid)->where('is_temp', true)->update([
            'imageable_type' => 'App\Models\Post',
            'imageable_id' => $post->id, 
            'is_temp' => false, 
        ]);

        return Inertia::location(route('posts.index'));
    }

    
    public function create()
    {
        return Inertia::render('Posts/Create');
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
        $post = Post::with('images')->findOrFail($id);
        $post->update($request->all());
    
        return redirect()->route('posts.index')->with('message', 'Post updated successfully.');
    }

    public function edit($id)
    {
        $post = Post::findOrFail($id);
    
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
