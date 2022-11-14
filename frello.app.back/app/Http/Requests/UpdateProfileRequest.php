<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $user = auth()->user();

        return [
            'name' => 'required|string|min:8|max:70',
            'username' => 'required|string|min:4|max:32|unique:users,username,' . $user->id,
            'email' => 'required|email|min:8|max:320|unique:users,email,' . $user->id,
            'old_password' => 'required|min:8|string',
            'new_password' => 'required|min:8|string|confirmed',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'please enter your name',
            'name.string' => 'invalid name',
            'name.min' => 'name minimal lenght must be 8',
            'name.max' => 'name maximum lenght must be 70',
            'username.required' => 'please enter your username',
            'username.string' => 'invalid username',
            'username.min' => 'username minimal lenght must be 4',
            'username.max' => 'username maximum lenght must be 32',
            'username.unique' => 'this username already taken',
            'email.required' => 'please enter your email',
            'email.email' => 'invalid email',
            'email.min' => 'email minimal lenght must be 8',
            'email.max' => 'email maximum lenght must be 320',
            'email.unique' => 'user with this email already exists',
            'password.required' => 'please enter your password',
            'password.string' => 'invalid password',
            'password.min' => 'password minimal lenght must be 8',
            'password.confirmed' => 'password does not match',
        ];
    }
}
