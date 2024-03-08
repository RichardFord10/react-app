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

        return Inertia::render('Posts/Feed', ['posts' => $posts, 'user_id' => auth()->id()]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'image' => 'required|image|max:10240', 
        ]);
        
        if ($request->hasFile('image')) {
            $filenameWithExt = $request->file('image')->getClientOriginalName();
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('image')->getClientOriginalExtension();
            $fileNameToStore = $filename.'_'.time().'.'.$extension;
            $path = $request->file('image')->storeAs('public/images', $fileNameToStore);
        } else {
            $fileNameToStore = 'noimage.jpg';
        }

        $post = new Post();
        $post->title = $request->title;
        $post->body = $request->body;
        $post->user_id = auth()->id();
        $post->image = $fileNameToStore;
        $post->save();
    
        return response()->json(['page' => route('posts.index')]);
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

    //handle file upload
    public function upload(Request $request)
    {

    }

}
