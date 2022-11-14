<?php

namespace App\Providers;

use App\Models\AcessUrlToken;
use Dotenv\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $tokens = AcessUrlToken::whereDate('created_at', '<=', now()->subDays(1));

        if ($tokens) {
            $tokens->delete();
        }
    }
}
