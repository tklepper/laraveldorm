<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    /**
     * Get the users in this unit.
     */
    public function users()
    {
        return $this->hasMany('App\User');
    }
}
