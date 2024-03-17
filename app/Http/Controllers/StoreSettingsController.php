<?php

namespace App\Http\Controllers;

use App\Models\StoreSettings;
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

        $storeSettings = StoreSettings::where('user_id', $userId)->first(); // Retrieve the store settings for the user

        if (!$storeSettings) {
            return Inertia::render('Store/Settings/Create', [
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

        // Validate the incoming request data
        $validatedData = $request->validate([
            'store_name' => 'required|string|max:255',
            'about_us' => 'nullable|string',
            'contact_email' => 'required|email|max:255',
            'contact_phone' => 'nullable|string|max:255',
        ]);

        // Create a new store settings instance and fill it with validated data
        $storeSettings = new StoreSettings($validatedData);

        $storeImage =
            // Assuming you have authentication and a user relation set up
            $storeSettings->user_id = auth()->id();

        // Save the store settings
        $storeSettings->save();

        // Redirect back or to another page, possibly with a success message
        return Inertia::render('store-settings.index',)->with('message', 'Store settings created successfully.');
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StoreSettings $storeSettings)
    {
        //
    }
}
