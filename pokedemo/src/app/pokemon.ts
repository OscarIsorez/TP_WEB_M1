

/* 

    This class is a model representing a Pokemon entity.
    @property id - The unique identifier for the Pokemon.
    @property name - The name of the Pokemon.
    @property base_experience - The base experience points of the Pokemon.
    @property height - The height of the Pokemon.
    @property weight - The weight of the Pokemon.
    @property order - The order of the Pokemon in the Pokedex (optional).
    @property sprites - An object containing sprite URLs for the Pokemon, including front_default.
    @property abilities - An array of ability entries, each containing ability details, is_hidden flag, and slot number.
    @property stats - An array of stat entries, each containing stat details and base_stat value.

    */
export class Pokemon {
    id: number = 0;
    name: string = '';
    base_experience: number = 0;
    height: number = 0;
    weight: number = 0;
    order?: number;
    // keep sprites shape used in template
    sprites: { front_default?: string } = {};
    // ability entries from the API: { ability: { name }, is_hidden, slot }
    abilities: { ability: { name: string }, is_hidden: boolean, slot: number }[] = [];
    // stats entries from the API: { stat: { name }, base_stat }
    stats: { stat: { name: string }, base_stat: number }[] = [];
}