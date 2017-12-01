<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class votes extends Model
{
    protected $fillable = ['vote','allocate','year'];
}
