// ...existing code...
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
    // optional extra fields can be added if needed
}