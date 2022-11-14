<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegistrationRequest extends FormRequest
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
        return [
            'username' => 'required|string|min:4|max:32|unique:users,username',
            'email' => 'required|email|min:8|max:320|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
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
