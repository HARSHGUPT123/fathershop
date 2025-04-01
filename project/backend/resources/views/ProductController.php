<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function getProductDetails($id)
    {
        $cacheKey = "product_details_{$id}";
        return Cache::remember($cacheKey, now()->addMinutes(10), function () use ($id) {
            $url = "https://fatherstock-cache.b-cdn.net/cache/{$id}-f1.json";
            $response = Http::get($url);

            if ($response->failed()) {
                return response()->json(['error' => 'Product not found'], 404);
            }

            return response()->json($response->json());
        });
    }
}
