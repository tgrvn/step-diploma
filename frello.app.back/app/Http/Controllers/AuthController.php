<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\IndexUserResource;
use App\Models\User;
use App\Models\UserBoard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register(RegistrationRequest $request)
    {
        $validated = $request->validated();
        $validated["password"] = bcrypt($validated["password"]);

        $user = User::create($validated);

        $token = $user->createToken($user->email)->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return $response;
    }

    public function login(LoginRequest $request)
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['user'])
            ->orWhere('username', $validated['user'])
            ->first();

        if (!$user) {
            $response = [
                "errors" => ["Користувач не знайдений", "Перевірте правильність данних або зареєструйте аккаунт"]
            ];

            return response($response, 401);
        }

        $fieldType = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        auth()->attempt([$fieldType => $validated["user"], 'password' => $validated["password"]]);

        $token = $user->createToken($user->email)->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return $response;
    }

    public function logout(Request $request)
    {
        $token = auth()->user()->tokens();
        $token->delete();
        return response()->json()->success(201, "OK");
    }

    public function profile()
    {
        $user = auth()->user();

        return response()->json()->success(201, "OK", ['user' => $user]);
    }

    public function update(UpdateProfileRequest $request)
    {
        $user = auth()->user();
        $dbUser = User::find($user)->first();

        $validated = $request->validated();

        if (!Hash::check($validated['old_password'], $dbUser->password)) {
            $response = [
                'errors' => 'incorrect password'
            ];

            return $response;
        } else if (Hash::check($validated['new_password'], $dbUser->password)) {
            $response = [
                'errors' => 'your new password cannot be the same as your current password'
            ];

            return $response;
        }

        $dbUser->update([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['new_password'])
        ]);

        $response = [
            'message' => 'your profile was updated'
        ];

        return $response;
    }
}
