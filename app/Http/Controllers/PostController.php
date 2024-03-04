<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{

    public function index()
    {
        $posts = Post::all();
        return Inertia::render('Posts/Feed', ['posts' => $posts]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);
    
        Post::create($request->only('title', 'body'));
    
        return redirect()->route('posts.index')->with('message', 'Post created successfully.');
    }
    
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    public function show($id)
    {
        $post = Post::findOrFail($id);
    
        return Inertia::render('Posts/Post', [
            'post' => $post
        ]);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
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
