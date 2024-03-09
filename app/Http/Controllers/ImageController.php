<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;

use Illuminate\Support\Facades\Log;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        Log::info($request->all());
        $request->validate([
            'image' => 'required|image',
            'type' => 'required|string', 
            'uuid' => 'required|string',  
            'imageable_type' => 'required|string', 

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

        ]);
    
        $image->save();
    
        return response()->json(['message' => 'Image uploaded successfully', 'data' => $image]);
    }
    
       
}
