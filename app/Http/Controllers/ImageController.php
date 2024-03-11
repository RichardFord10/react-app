<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Log;

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

            //if uuid does not match imageable_id, then it is a temp image and we are adding to an existing post
            $is_temp = $request->imageable_id == $request->uuid ? true : false;
            Log::info('ImageController@store', ['is_temp' => $is_temp]);
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
            Log::info('ImageController@store', ['image' => $image]);
            if ($image->save()) {
                Log::info('Image uploaded successfully', ['image' => $image]);
            }
        } catch (\Exception $e) {
            Log::error('ImageController@store', ['error' => $e->getMessage()]);
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
}
