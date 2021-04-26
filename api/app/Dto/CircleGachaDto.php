<?php


namespace App\Dto;

/*
 * pickupリストの戻り値
 */

use App\Support\Arr;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class CircleGachaDto
{
    /*
     * @var \App\ValueObjects\CircleValueObject[]
     * CircleValueObjectの配列（クラスの配列）
     *   
     */
    public array $result_circles;
    
    /*
     * @var \App\ValueObjects\CircleValueObject[]
     * CircleValueObjectの配列（クラスの配列）
     *   
     */
    public array $pickup_circles;//[class]
    
    public string  $gacha_hash;
    public int  $count;
    public Carbon  $created_at;

    public function toArray():array
    {
        return [
            'result_circles'=>$this->toArrayResultCircles(),
            'pickup_circles'=>$this->toArrayPickupCircles(),
            'gacha_hash'=>$this->gacha_hash,
            'count'=>$this->count,
            'created_at'=>$this->created_at,
        ];
    }

    //ただの配列にする関数 [class]→[[],[]]
    public  function toArrayPickupCircles():array
    {
        return (new Collection($this->pickup_circles))->map(
            fn (CircleValueObject $circleValueObject) =>
            Arr::only($circleValueObject->toArray(), [
                'id', 'name', 'handbill_image_url', 'slug'
            ])
        )->toArray();
    }

    //ただの配列にする関数 [class]→[[],[]]
    public  function toArrayResultCircles():array
    {
        return (new Collection($this->result_circles))->map(
            fn (CircleValueObject $circleValueObject) =>
            Arr::only($circleValueObject->toArray(), [
                'id', 'name', 'handbill_image_url', 'slug'
            ])
        )->toArray();
    }
}