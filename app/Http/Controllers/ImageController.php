<?php


namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\User;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image',
                'type' => 'required|string',
                'uuid' => 'required|string',
                'imageable_type' => 'required|string',
                'imageable_id' => 'required|regex:/^[a-zA-Z0-9\-_]+$/',
            ]);

            // Process and store the image
            $path = $request->file('image')->store('images', 'public');
            $is_temp = $request->imageable_id == $request->uuid ? true : false;

            $image = new Image([
                'uuid' => $request->uuid,
                'image' => $request->file('image')->hashName(),
                'image_path' => $path,
                'type' => $request->type,
                'is_temp' => $is_temp,
                'user_id' => auth()->id(),
                'imageable_type' => $request->imageable_type,
                'imageable_id' => $request->imageable_id,
            ]);

            if ($image->save() && $request->type === 'user') {
                Log::info('ImageController@store', ['image' => $image]);
                $this->processUserImages($image->id, $path);
            } elseif ($image->save() && $request->type === 'store_logo') {
                Log::info('ImageController@store', ['image' => $image]);
                $this->processStoreImages($path);
            }
        } catch (\Exception $e) {
            Log::error('ImageController@store', ['error' => $e->getMessage()]);
        }
    }

    // The rest of your methods remain unchanged

    public function processUserImages($id, $path)
    {
        $user = Auth::user();
        if ($user) {
            $user->image_id = $id;
            $user->image_path = $path;
            $user->save();
        } else {
            Log::error('No authenticated user found');
        }
    }

    public function processStoreImages($path)
    {
        $store = Store::where('user_id', Auth::id())->first();
        if ($store) {
            $store->store_logo = $path;
            $store->save();
        } else {
            Log::error('No store found for authenticated user');
        }
    }
    public function update(Request $request, $id)
    {

        $image = Image::findOrFail($id);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('images', 'public');

            $image->update([
                'image' => $file->hashName(),
                'image_path' => $path,
            ]);
        }
    }

    public function destroy($id)
    {
        $image = Image::findOrFail($id);
        $image->delete();
    }

    public function show($id)
    {
        $image = Image::findOrFail($id, ['id', 'image_path']);
        return response()->json($image);
    }
}
