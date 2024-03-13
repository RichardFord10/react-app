<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;


class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $posts = $user->posts()->with('images')->get();
        $orders = Order::all();

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
                'posts' => $posts,
                'orders' => $orders
            ],
        ]);
    }
}
