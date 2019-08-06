<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    $gender = 
    
    $latestDate = new DateTime('2001-12-31');
    $earliestDate = new DateTime('1990-01-01');
    return [
        'name' => $faker->name($gender),
        'email' => $faker->unique()->safeEmail,
        'street' => $faker->streetAddress,
        'city' => $faker->city,
        'state' => $faker->stateAbbr,
        'zip' => $faker->postcode,
        'phone' => $faker->phoneNumber,
        'gender' => $faker->randomElement(['Male', 'Female']),
        'dob' => $faker->dateTimeBetween($earliestDate,$latestDate)->format('Y-m-d'),
        'student_id' => $faker->unique()->randomNumber(8),
        'unit_id' => null,
        'building_number' => $faker->randomElement([1,2])
    ];
});
