<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Faker\Generator as Faker;

class UserTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testForUserCreation()
    {
        $new_user = factory('App\User')->raw(); 
        $response = $this->withHeaders([ 
            'X-Header' => 'Value',
        ])->json('POST', '/api/users', $new_user);

        $response
            ->assertStatus(200)
            ->assertJson([
                'created' => true,
            ]);
    }
}
