<?php

namespace App\Http\Controllers;

use App\Models\StoreSettings;
use App\Models\Store;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Http\Controllers\ImageController;

class StoreSettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();

        // Eager load the 'store' relationship along with 'images'
        $storeSettings = StoreSettings::with(['store', 'images' => function ($query) use ($userId) {
            $query->where('user_id', $userId)->where('type', 'store_logo');
        }])->where('user_id', $userId)->first();

        // Check if storeSettings was found
        if (!$storeSettings) {
            return Inertia::render('Store/Settings/Index', [
                'storeSettings' => null,
                'user_id' => $userId
            ]);
        } else {
            // Assuming you want to add 'store_slug' directly to your $storeSettings object for convenience
            $storeSettings->store_slug = $storeSettings->store ? $storeSettings->store->store_slug : null;

            return Inertia::render('Store/Settings/Index', [
                'storeSettings' => $storeSettings,
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
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        Log::info('store_settings', $request->all());

        $validatedData = $request->validate([
            'store_name' => 'required|string|max:255',
            'about_us' => 'nullable|string',
            'contact_email' => 'required|email|max:255',
            'contact_phone' => 'nullable|string|max:255',
            'store_slug' => 'required|string|max:255',
            'active' => 'required|boolean',
            'social_media_links' => 'nullable|array',
            'payment_methods' => 'nullable|array',
            'shipping_info' => 'nullable|string',
            'tax_settings' => 'nullable|array',
            'seo_settings' => 'nullable|array',
            'analytics_code' => 'nullable|string',
            'category' => 'nullable|string',
            'state' => 'nullable|string',
            'city' => 'nullable|string',
        ]);
        Log::info('validated_data', $validatedData);
        $store = Store::updateOrCreate(
            ['user_id' => auth()->id()],
            [
                'store_name' => $validatedData['store_name'],
                'store_slug' => $validatedData['store_slug'],
                'status' => $validatedData['active'] ? 'active' : 'inactive',
                'city' => $validatedData['city'] ?? '',
                'state' => $validatedData['state'] ?? '',
                'country' => $validatedData['country'] ?? '',
                'category' => $validatedData['category'] ?? null,
                'status' => $validatedData['active'] ? 'active' : 'inactive',
            ]
        );

        $image = Image::where('user_id', auth()->id())->where('type', 'store_logo')->first();
        $validatedData['store_id'] = $store->id;
        $validatedData['user_id'] = auth()->id();
        $validatedData['store_logo'] = $image ? $image->image_path : null;
        $storeSettings = StoreSettings::updateOrCreate(['user_id' => auth()->id()], $validatedData);
        Log::info('validate_data', $validatedData);
        return Inertia::render('Store/Settings/Index', [
            'storeSettings' => $storeSettings,
            'message' => 'Store settings changed successfully.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(StoreSettings $storeSettings)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StoreSettings $storeSettings)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StoreSettings $storeSettings)
    {

        $validatedData = $request->validate([
            'store_name' => 'required|string|max:255',
            'about_us' => 'nullable|string',
            'contact_email' => 'required|email|max:255',
            'contact_phone' => 'nullable|string|max:255',
            'active' => 'required|boolean',
        ]);

        // Update the Store model
        $store = Store::where('id', $storeSettings->store_id)->first();
        if ($store) {
            $store->update([
                'store_name' => $validatedData['store_name']
            ]);
        }

        // Update the store settings with the validated data
        $storeSettings->update($validatedData);

        // Redirect back or to another page, possibly with a success message
        return Inertia::render('Store/Settings/Index', [
            'storeSettings' => $storeSettings,
            'message' => 'Store settings updated successfully.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StoreSettings $storeSettings)
    {
        //
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
