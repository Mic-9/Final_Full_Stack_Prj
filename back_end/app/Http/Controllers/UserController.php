<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\HasApiTokens;

class UserController extends Controller
{
    use HasApiTokens;

    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'username' => 'required|string|max:255|unique:users',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $userData = $validatedData;
            unset($userData['is_admin']);

            $user = User::create([
                'username' => $userData['username'],
                'email' => $userData['email'],
                'password' => Hash::make($userData['password']),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'User created successfully',
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Password or email are incorrect.',
                ], 401);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ], 200);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validatedData = $request->validate([
            'username' => 'sometimes|required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|required|string|min:8|confirmed',
        ]);

        $dataToUpdate = $validatedData;
        unset($dataToUpdate['is_admin']);

        if (isset($dataToUpdate['password'])) {
            $dataToUpdate['password'] = Hash::make($dataToUpdate['password']);
        }

        $user->update($dataToUpdate);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }
}
