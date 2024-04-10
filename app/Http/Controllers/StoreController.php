<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Image;
use Exception;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();

        // Eager load the 'store' relationship along with 'images'
        $store = Store::where('user_id', auth()->id())->first();

        // Check if storeSettings was found
        if (!$store) {
            return Inertia::render('Store/Settings/Index', [
                'storeSettings' => null,
                'user_id' => $userId
            ]);
        } else {

            return Inertia::render('Store/Settings/Index', [
                'storeSettings' => $store,
                'user_id' => $userId,
            ]);
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info('store_settings', $request->all());

        try {
            $validatedData = $request->validate([
                'store_name' => 'required|string|max:255',
                'store_slug' => 'required|string|max:255',
                'about_us' => 'nullable|string',
                'contact_email' => 'required|email|max:255',
                'contact_phone' => 'nullable|string|max:255',
                'status' => 'nullable|string',
                // 'social_media_links' => 'nullable|array',
                // 'payment_methods' => 'nullable|array',
                // 'shipping_info' => 'nullable|array',
                // 'tax_settings' => 'nullable|array',
                // 'seo_settings' => 'nullable|array',
                'analytics_code' => 'nullable|string',
                'category' => 'nullable|string',
                'country' => 'nullable|string',
                'state' => 'nullable|string',
                'city' => 'nullable|string',
            ]);
        } catch (Exception $e) {

            Log::info($e->getMessage());
        }

        Log::info('validated_data', $validatedData);

        Store::updateOrCreate(
            ['user_id' => auth()->id()],
            [
                'store_name' => $validatedData['store_name'],
                'store_slug' => $validatedData['store_slug'],
                'about_us' => $validatedData['about_us'] ?? '',
                'contact_email' => $validatedData['contact_email'] ?? '',
                'contact_phone' => $validatedData['contact_phone'] ?? '',
                'status' => $validatedData['status'] ? 'active' : 'inactive',
                'category' => $validatedData['category'] ?? null,
                'social_media_links' => $validatedData['social_media_links'] ?? null,
                'payment_methods' => $validatedData['payment_methods'] ?? null,
                'shipping_info' => $validatedData['shipping_info'] ?? null,
                'tax_settings' => $validatedData['tax_settings'] ?? null,
                'seo_settings' => $validatedData['seo_settings'] ?? null,
                'analytics_code' => $validatedData['analytics_code'] ?? null,
                'country' => $validatedData['country'] ?? '',
                'state' => $validatedData['state'] ?? '',
                'city' => $validatedData['city'] ?? '',
            ]
        );

        return redirect()->route('store-settings.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($store_slug)
    {
        $store = Store::where('store_slug', $store_slug)->first();

        if (!$store) {
            return redirect()->route('stores.index');
        }

        $url = route('stores.show', ['store' => $store->store_slug]);

        return view('stores.show', compact('store'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Store $store)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Store $store)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $store = Store::findOrFail($id);
        $store->delete();

        return redirect()->route('store-settings.index')->with('message', 'Post deleted successfully.');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
