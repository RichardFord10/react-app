<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'total' => 'required|string',
            'order_date' => 'required|date',
            'customer_name' => 'required|string|max:100',
            'status' => 'required|in:Pending,Completed,Cancelled',
        ]);

        $order = new Order();
        $order->user_id = $request->user_id;
        $order->total = $request->total;
        $order->status = $request->status;

        $order->save();

        return response()->json($order);
    }
}
