<?php

namespace App\Http\Resources;

use App\Models\UserBoard;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowBoardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        return [
            'id' => $this->id,
            'name' => $this->name,
            'theme' => $this->theme,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'members' => ShowUserResource::collection($this->users),
            'columns' => ShowColumnResource::collection($this->columns),
        ];
    }
}
