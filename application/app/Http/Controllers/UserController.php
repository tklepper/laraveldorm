<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Unit;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get all users
        $users = User::all();
        // Load in the Unit for each user as an object
        $users->load('unit');
        //Return json of users object.
        return response()->json(["data" => $users]);
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $new_user = new User;
        $new_user->name = $request->name;
        $new_user->email = $request->email;
        $new_user->street = $request->street;
        $new_user->city = $request->city;
        $new_user->state = $request->state;
        $new_user->zip = $request->zip;
        $new_user->phone = $request->phone;
        $new_user->gender = $request->gender;
        $new_user->dob = $request->dob;
        $new_user->student_id = $request->student_id;
        $new_user->password = Hash::make(substr(md5(mt_rand()), 0, 10));

        // Get all units
        $units = Unit::where('building_number','=',$request->building_number)->get();
        unset($request['building_number']); //For factory/phpunit test
        // Load Occupants as Unit objects
        $units->load('users');
        foreach($units as $unit){
            //Make sure room is not full
            if(count($unit->users) < 8){
                // If room does not have occupants add user.
                if(count($unit->users) == 0){
                    $new_user->unit_id = $unit->id;
                } else {
                    // Get user that is already occupying the room.
                    $occupant = $unit->users->first();
                    // Check gender, and only add new user if gender's match
                    if($occupant->gender==$new_user->gender){
                        $new_user->unit_id = $unit->id;
                    }
                    
                }
            }
        }
        $new_user->save();
        $unit = Unit::find($new_user->unit_id);
        $unit->load('users');
        $units = Unit::all();
        $units->load('users');
        return response()->json(['created' =>true,'unit'=>$unit, 'units' => $units]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Edit User
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->street = $request->street;
        $user->city = $request->city;
        $user->state = $request->state;
        $user->zip = $request->zip;
        $user->phone = $request->phone;
        $user->gender = $request->gender;
        $user->dob = $request->dob;
        $user->student_id = $request->student_id;
        $user->unit_id = $request->unit_id;
        $user->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::destroy($id);
    }
}
