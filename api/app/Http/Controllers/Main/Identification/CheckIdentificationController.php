<?php

namespace App\Http\Controllers\Main\Identification;

use App\Enum\Property\IdentifierProperty;
use App\Http\Controllers\Controller;
use App\Models\Identifier;
use App\Support\Arr;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CheckIdentificationController extends Controller
{
   

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        Log::debug("#CheckIdentificationController args: none");
        
        
        Route::get('api/identification/valid/{identifer_hash}',function($identifer_hash){
            $identifer_hash_db=Identifier::where("identifier_hash",$identifer_hash)->first();
           if( $identifer_hash_db->isEmpty() ){
               //ステータスコード400を返す
               return abort(400);
               
            }else{
                //ステータスコード200を返す
                 return [];
                 
            }
        });

   
    }


}