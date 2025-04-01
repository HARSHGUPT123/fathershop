<?php 
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/categories', [CategoryController::class, 'getCategories']);
Route::get('/categories/{id}', [CategoryController::class, 'getCategoryProducts']);
Route::get('/product/{id}', [ProductController::class, 'getProductDetails']);
