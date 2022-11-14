<?php

namespace App\Providers;

use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Support\ServiceProvider;

class ResponseApiProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $response = app(ResponseFactory::class);

        $response->json()->macro('success', function ($status, $code, $data = null) use ($response) {
            $responseData = [
                'status' => $status,
                'code' => $code,
                'data' => $data,
            ];

            return $response->json($responseData, $status);
        });

        $response->json()->macro('error', function ($status, $code, $errors) use ($response) {

            if (is_string($errors)) {
                return $response->json([
                    'status' => $status,
                    'code' => $code,
                    'errors' => [$errors],
                ], $status);
            }

            $flatten = [];
            array_walk_recursive($errors, function ($error) use (&$flatten) {
                $flatten[] = $error;
            });

            return $response->json([
                'status' => $status,
                'code' => $code,
                'errors' => $flatten,
            ], $status);
        });
    }
}
