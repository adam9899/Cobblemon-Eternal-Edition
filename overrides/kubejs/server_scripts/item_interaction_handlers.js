// const $PokemonEntity = Java.loadClass('com.cobblemon.mod.common.entity.pokemon.PokemonEntity')
// const $PokemonStats = Java.loadClass('com.cobblemon.mod.common.api.pokemon.stats.Stats')
// const $InteractionHand = Java.loadClass('net.minecraft.world.InteractionHand')

//technically expandable, idk why you would but you could.
const statupMap = {
    'cobblemoneternal:bottle_cap/hp': [$PokemonStats.HP],
    'cobblemoneternal:bottle_cap/atk': [$PokemonStats.ATTACK],
    'cobblemoneternal:bottle_cap/def': [$PokemonStats.DEFENCE],
    'cobblemoneternal:bottle_cap/spa': [$PokemonStats.SPECIAL_ATTACK],
    'cobblemoneternal:bottle_cap/spd': [$PokemonStats.SPECIAL_DEFENCE],
    'cobblemoneternal:bottle_cap/spe': [$PokemonStats.SPEED],
    'cobblemoneternal:bottle_cap/gold': $PokemonStats.Companion.PERMANENT
}

ItemEvents.entityInteracted(event => {
    let pokemonEntity = event.target

    if(!statupMap[event.item.id]
        || !(pokemonEntity instanceof $PokemonEntity)
        || event.hand == $InteractionHand.OFF_HAND
        || event.entity.isCrouching()) 
            return;

    let pokemon = pokemonEntity.pokemon
    let player = event.entity
    let used = false
    // for whatever reason, IVs do not seem to be interpreted as Map by KJS, but rather an Array.
    // i have literally no idea why, the type used for the entries is what you would expect from a Map in Java
    let IVMap = {}

    if(!pokemon.belongsTo(player)){
        player.setStatusMessage(Text.translate('message.cobblemoneternal.thats_not_your_pokemon').color('red'))
        return
    }

    if(pokemon.level < 50){
        player.setStatusMessage(Text.translate('message.cobblemoneternal.feature.bottle_cap_min_level_req').color('red'))
        return;
    }
    /*
    console.log(
        pokemonEntity,
        statupMap[event.item.id],
        event.hand,
        event.hand == $InteractionHand.OFF_HAND,
        pokemon.ivs
    )
    */

    pokemon.ivs.forEach(entry => {
        IVMap[entry.getKey()] = entry.getValue()
    })

    statupMap[event.item.id].forEach(stat => {
        /*
        console.log(stat)
        pokemon.ivs.forEach(iv => console.log(iv))
        */

        if(player.offhandItem.id == 'cobblemoneternal:potential_limiter'){
            if(IVMap[stat] > 0){
                pokemon.setIV(stat, 0)
                used = true
            }
        } else if(IVMap[stat] < 31){
            pokemon.setIV(stat, 31)
            used = true
        }
    })

    if(used){
        player.swing(event.hand, true)
        if(!player.isCreative())
            event.item.count--
    }
})