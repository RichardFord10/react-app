<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('store_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('active')->default(false);
            $table->string('store_name');
            $table->string('store_logo')->nullable();
            $table->string('store_banner')->nullable();
            $table->text('about_us')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->json('social_media_links')->nullable();
            $table->json('payment_methods')->nullable();
            $table->json('shipping_info')->nullable();
            $table->json('tax_settings')->nullable();
            $table->json('seo_settings')->nullable();
            $table->string('analytics_code')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('store_settings');
    }
};
