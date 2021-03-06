<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        return User::latest()->paginate(10);
    }
    public function store(Request $request)
    {
        $this->validate($request,[
            'name' => 'required | string | max:191',
            'email' => 'required | string | email | max:191|unique:users',
            'password' => 'required | string |min:8'
        ]);
        return User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'type' => $request['type'],
            'bio' => $request['bio'],
            'photo' => $request['photo'],
            'password' => Hash::make($request['password']),
        ]);
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
       $user = User::findOrFail($id);
       $this->validate($request,[
        'name' => 'required | string | max:191',
        'email' => 'required | string | email | max:191|unique:users,email,'.$user->id,
        'password' => 'sometimes|min:8'
        ]);
       
        $user->update($request->all());

       return ['message' => 'update in'];   
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return ['Data terhapus'];
    }
}
