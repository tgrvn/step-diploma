<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateBoardRequest extends FormRequest
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
        $themeIdRule = 'required_with:theme_type';

        if ($this->has('theme_type')) {
            $themeIdRule .= '|exists:' . 'App\\Models\\' . $this->theme_type . ',id';
        }

        return [
            'name' => 'required|string|min:1|max:45',
            'theme_type' => 'required_with:name',
            'theme_id' => $themeIdRule
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
            'name.required' => 'please enter board name',
            'name.string' => 'invalid name',
            'name.min' => 'name minimum lenght must be 1',
            'name.max' => 'name maximum lenght must be 32',
            'theme_type.required_with' => 'invalid theme',
            'theme_id.required_with' => 'invalid theme',
            'theme_id.model_exists' => 'invalid theme',
        ];
    }
}
