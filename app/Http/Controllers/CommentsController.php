<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Post;

class CommentsController extends Controller
{
    public function index($postId)
    {
        // Fetch comments for the given post ID
        $comments = Comment::where('post_id', $postId)->get();

        return response()->json(['comments' => $comments]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'body' => 'required|string',
            'post_id' => 'required|exists:posts,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $comment = new Comment();
        $comment->body = $request->body;
        $comment->post_id = $request->post_id;
        $comment->user_id = $request->user_id;
        $comment->save();

        $comment->load('user');

        return response()->json($comment, 201); // Return the new comment with the user object
    }
}
