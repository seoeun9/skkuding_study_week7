"use client";

import Image from "next/image";
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

type PokeAPIResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number }[];
};

export default function PokemonItem(){
    const router = useRouter();
    const [pokemonData, setPokemonData] = useState<dataType[]>([]);
    
    useEffect(() => {
    async function fetchPokemon() {
        try {
            const promises = [];

            for (let i = 1; i <= 10; i++) {
            const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json());
            promises.push(promise);
            }

            const results = await Promise.all(promises);

            const formattedData = results.map((p: PokeAPIResponse) => ({
            ID: p.id,
            Name: p.name,
            Height: p.height,
            Weight: p.weight,
            Types: (Array.isArray(p.types) ? p.types : [p.types])
                    .map((t: { type: { name: string } }) => t.type.name)
                    .join(", "),
            Base_Experience: p.base_experience.toString(),
            Abilities: (Array.isArray(p.abilities) ? p.abilities : [p.abilities])
                        .map((a: { ability: { name: string }}) => a.ability.name)
                        .join(", "),
            HP: p.stats[0].base_stat,
            Attack: p.stats[1].base_stat,
            Defense: p.stats[2].base_stat,
            Special_Attack: p.stats[3].base_stat.toString(),
            Speed: p.stats[5].base_stat,
            }));

            setPokemonData(formattedData);
            }
            catch (err) {
            console.error("에러", err);
            }
        };
    fetchPokemon();
    }, []);

    function CreateCard(){
        
            if (!pokemonData) {
                return <div>Loading...</div>;
            } 

            return(
                <div className="container">
                    {pokemonData.map((item, index) => (
                        <div 
                            className="item"    
                            key={index}     
                            onClick={ () => {
                                window.localStorage.setItem("pr_item", JSON.stringify(item));
                                router.push("/PokemonDetail");
                            }}>                            
                            <Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item!.ID}.png`}
                            alt={item!.Name}
                            width={80}
                            height={80}    
                            unoptimized
                            />
                            <text>
                                <div className="h2">
                                    <b>{item.Name}</b><br />
                                </div>
                            Height : {item.Height} <br />
                            Weight : {item.Weight} <br />
                            Types : {item.Types}
                            </text>
                        </div>
                    ))};
                </div>
            );
        }
    return (
        <CreateCard />
    );
};