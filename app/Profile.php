<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'status', 'fields', 'user_id',
    ];

    public function User()
    {
        return $this->belongsTo('App\User');
    }
}
