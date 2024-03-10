<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function store(Request $request)
    {

        if (isset($request->image_id)) {
            $image = Image::findOrFail($request->image_id);

            // Store the image and get the path
            $path = $request->file('image')->store('images', 'public');

            // Update the image record with the new path
            $image->update([
                'image' => $request->file('image')->hashName(), // Assuming you want to store just the filename
                'image_path' => $path,
                'is_temp' => false,
            ]);

            // Generate a full URL to the stored image
            $fullPath = asset('storage/' . $path);

            // Return the full path in the response
            return response()->json(['message' => 'Image uploaded successfully', 'imagePath' => $fullPath]);
        }


        $request->validate([
            'image' => 'required|image',
            'type' => 'required|string',
            'uuid' => 'required|string',
            'imageable_type' => 'required|string',
            'imageable_id' => 'required|string',
        ]);

        // Process and store the image
        $path = $request->file('image')->store('images', 'public');

        $image = new Image([
            'uuid' => $request->uuid,
            'image' => $request->file('image')->hashName(),
            'image_path' => $path,
            'type' => $request->type,
            'is_temp' => true,
            'user_id' => auth()->id(),
            'imageable_type' => $request->imageable_type,
            'imageable_id' => $request->imageable_id,
        ]);

        $image->save();

        return response()->json(['message' => 'Image uploaded successfully', 'data' => $image]);
    }

    public function destroy($id)
    {
        $image = Image::findOrFail($id);
        $image->delete();

        return response()->json(['message' => 'Image uploaded successfully'], 201);
    }
}
