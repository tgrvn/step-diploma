<?php

namespace Database\Seeders;

use App\Models\Background;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class BackgroundsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $backgrounds = Storage::files('public/assets/backgrounds');

        foreach ($backgrounds as $file) {
            Background::create([
                'img_path' => url(\str_replace('public', 'storage', $file)),
                'type' => 'background'
            ]);
        }
    }
}
