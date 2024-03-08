<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $posts = $user->posts;

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
                'posts' => $posts,
            ],
        ]);
    }
}
