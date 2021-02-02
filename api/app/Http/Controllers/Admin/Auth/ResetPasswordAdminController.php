<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;

class ResetPasswordAdminController extends Controller
{
    use ResetsPasswords;

    public function __invoke(Request $request)
    {
        $this->reset($request);
    }

    /**
     * Get the response for a successful password reset.
     *
     * @param Request $request
     * @param  string  $response
     * @return array
     */
    protected function sendResetResponse(Request $request, $response)
    {
        return ['status' => trans($response)];
    }

    /**
     * Get the response for a failed password reset.
     *
     * @param Request $request
     * @param  string  $response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetFailedResponse(Request $request, $response)
    {
        return response()->json(['email' => trans($response)], 400);
    }
}
