"use client";

import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface dataType {
    ID: number;
    Name: string;
    Height: number;
    Weight: number;
    Types: string;
    Base_Experience: string;
    Abilities: string;
    HP: number;
    Attack: number;
    Defense: number;
    Special_Attack: string;
    Speed: number;
}

export default function PokemonDetail(){
    const [pokemon, setPokemon] = useState<dataType | null>(null);
    const router = useRouter();

    useEffect(() => {
        const item = JSON.parse(window.localStorage.getItem("pr_item") ?? "{}");
        setPokemon(item);
    }, []);

   if (!pokemon) {
      return <div>Loading...</div>;
   } 
    return (
        <div className="body">
            <div className="title"
                onClick={() => {
                router.push("/");
                }}
            style={{ cursor: "pointer" }}>

                <span className="h1">
                    <b>Pokemon List</b>
                </span>
            </div>

            <div className="img-wrapper">
            <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon!.ID}.png`}
            alt={pokemon!.Name}
            width={300}
            height={300}
            unoptimized
            />
            </div>
            <table className="infoTable">
                <tbody>
                    {pokemon && Object.entries(pokemon).map(([key, value]) => (
                        <tr key={key}>
                            <td>
                                <b>{key}</b>
                            </td>
                            <td>
                                {String(value)}
                            </td>
                        </tr>                    
                    ))}
                </tbody>
            </table>
        </div>
    );
}
