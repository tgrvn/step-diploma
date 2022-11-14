<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NameValidatingRequest extends FormRequest
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
            'name' => 'required|string|min:1|max:255',
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
            'name.required' => 'please enter name',
            'name.string' => 'invalid name',
            'name.min' => 'name minimum lenght must be 1',
            'name.max' => 'name maximum lenght must be 45',
        ];
    }
}
