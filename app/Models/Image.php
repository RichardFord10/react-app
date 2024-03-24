<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'image', 'type', 'uuid', 'imageable_type', 'imageable_id', 'is_temp', 'image_path'];

    public function imageable()
    {
        return $this->morphTo();
    }
}
