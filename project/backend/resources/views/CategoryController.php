<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    public function getCategories()
    {
        $cacheKey = 'categories';
        return Cache::remember($cacheKey, now()->addMinutes(10), function () {
            $url = "https://fatherstock-cache.b-cdn.net/category/hot-category.json";
            $response = Http::get($url);

            if ($response->failed()) {
                return response()->json(['error' => 'Categories not found'], 404);
            }

            return response()->json($response->json());
        });
    }

    public function getCategoryProducts($id)
    {
        $cacheKey = "category_products_{$id}";
        return Cache::remember($cacheKey, now()->addMinutes(10), function () use ($id) {
            $url = "https://fatherstock-cache.b-cdn.net/category/{$id}.json";
            $response = Http::get($url);

            if ($response->failed()) {
                return response()->json(['error' => 'Category not found'], 404);
            }

            return response()->json($response->json());
        });
    }
}
