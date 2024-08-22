'use client';

import { useQuery } from "@tanstack/react-query";
import { get_attribute_by_item } from "../../Services/Services_Items/attribute";


export function Get_Attribute_Items(id_item : any){
    const {data, ... rest} = useQuery({
        queryKey:  ['Attribute_Key'] ,
        queryFn : async () => id_item && await get_attribute_by_item(id_item),
    })
    return {data, ... rest};
}