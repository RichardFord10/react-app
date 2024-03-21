<?php

namespace App\Http\Controllers;

use App\Models\StoreSettings;
use App\Models\Store;
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

        $storeSettings = StoreSettings::where('user_id', $userId)->first();

        if (!$storeSettings) {
            return Inertia::render('Store/Settings/Index', [
                'storeSettings' => null,
                'user_id' => $userId

            ]);
        } else {
            return Inertia::render('Store/Settings/Index', [
                'storeSettings' => $storeSettings,
                'user_id' => auth()->id()
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
        Log::info('Store settings request data: ' . json_encode($request->all()));

        $validatedData = $request->validate([
            'store_name' => 'required|string|max:255',
            'about_us' => 'nullable|string',
            'contact_email' => 'required|email|max:255',
            'contact_phone' => 'nullable|string|max:255',
            'store_slug' => 'required|string|max:255',
        ]);

        $store = Store::updateOrCreate(
            ['user_id' => auth()->id()],
            [
                'store_name' => $validatedData['store_name'],
                'store_slug' => $validatedData['store_slug'],
                'status' => 'active'
            ]
        );

        $validatedData['store_id'] = $store->id;
        $validatedData['user_id'] = auth()->id();

        $storeSettings = StoreSettings::create($validatedData);

        return Inertia::render('Store/Settings/Index', [
            'storeSettings' => $storeSettings,
            'message' => 'Store settings created successfully.'
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
        ]);

        // Update the Store model
        $store = Store::where('id', $storeSettings->store_id)->first();
        if ($store) {
            $store->update([
                'store_name' => $validatedData['store_name']
                // Update other fields as necessary
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
}
