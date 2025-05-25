"use client";

import PokemonItem from "@/components/PokemonItem"
import { useRouter } from 'next/navigation';


export default function PokemonList(){
  const router = useRouter();

    return (
        <div className='body'>
            <div className="title"
                 onClick={() => {
                 router.push("/");
                 }}
                style={{ cursor: "pointer" }}>
                  
              <span className="h1">
                  <b>Pokemon List</b>
              </span>
            </div>
              <PokemonItem />
        </div>
    );
}