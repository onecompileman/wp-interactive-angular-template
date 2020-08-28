<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Http;
use Auth;

class ApiController extends Controller
{

    public function apiRouter(Request $request)
    {
        $path    = $request->path();
        $method  = $request->method();
        $payload = $request->all();
        $client  = Http::withToken(config('app.api_token'))->withHeaders(['Accept' => 'application/json']);
        $host    = config('app.api_host');
        // dd("{$method} {$host}/{$path}");
        if ($method == "GET")
            return $client->get("{$host}/{$path}", $payload);
        if ($method == "POST") {
            if ($path == 'api/v1/user/authenticate')
                $payload['useragent'] = $request->header('User-Agent');
            $response = $client->post("{$host}/{$path}", $payload);
            // dd($response);
            if ($path == 'api/v1/user/authenticate') {
                $return = json_decode($response->getBody()->getContents());
                if ($return->success){
                    Auth::loginUsingId($return->data->user_id, true);
                    session(['session_id' => $return->data->session_id]);
                }
            }
            return $response;
        }
        return response()->json([
            'success' => false,
            'message' => 'Method not supported.',
        ], 405);
    }
}
