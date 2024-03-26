<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\StoreSettingsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\PostController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');



//auth routes
Route::middleware('auth')->group(function () {
    Route::get('/store-settings', [StoreSettingsController::class, 'index'])->name('store-settings.index');
    Route::post('/store-settings', [StoreSettingsController::class, 'store'])->name('store-settings.store');
    Route::get('/images/{id}', [ImageController::class, 'show']);
    Route::put('/update-image/{id}', [ImageController::class, 'update'])->name('image.update');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::post('/upload-image', [ImageController::class, 'store'])->name('image.store');
    Route::resource('/posts', PostController::class);
    Route::resource('/store', StoreController::class);
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');
    Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
    Route::delete('/posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy');
    Route::delete('/delete-image/{id}', [ImageController::class, 'destroy'])->name('image.delete');
    Route::resource('comments', CommentsController::class);
    Route::get('/posts/{postId}/comments', [CommentsController::class, 'index']);
    Route::patch('/posts/update/{id}', [PostController::class, 'update'])->name('posts.update');
    Route::get('/posts/edit/{id}', [PostController::class, 'edit'])->name('posts.edit');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//non auth routes


require __DIR__ . '/auth.php';
