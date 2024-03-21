<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'store_id',
        'store_name',
        'store_logo',
        'store_banner',
        'about_us',
        'contact_email',
        'contact_phone',
        'social_media_links',
        'payment_methods',
        'shipping_info',
        'tax_settings',
        'seo_settings',
        'analytics_code',
    ];
}
