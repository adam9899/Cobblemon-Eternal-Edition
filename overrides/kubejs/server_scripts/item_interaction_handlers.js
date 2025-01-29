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
    'cobblemoneternal:bottle_cap_gold': $PokemonStats.Companion.PERMANENT
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
    let soundEvent = {sound: 'minecraft:entity.player.hurt', volume: 1.0, pitch: 1.0};
    let messageKey = 'message.cobblemoneternal.error'
    let statsBoosted = Text.empty()
    let entry = statupMap[event.item.id]
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

    let usingLimiter = player.offhandItem.id == 'cobblemoneternal:potential_limiter'

    //determine message to use
    if(entry.length == 6) // all 6 stats will use the 'all' form message
        if(usingLimiter) messageKey = 'message.cobblemoneternal.all_stats_minimized'
        else messageKey = 'message.cobblemoneternal.all_stats_maximized'
    else if(entry.length == 1) // single stats use the singular form message
        if(usingLimiter) messageKey = 'message.cobblemoneternal.stat_minimized' 
        else messageKey = 'message.cobblemoneternal.stat_maximized'
    //else // multiple stats use the plural form message - this would be annoying to program and we're not going to use it, so it will stay commented out for now.
        //if(usingLimiter) messageKey = 'message.cobblemoneternal.multiple_stats_minimized' 
        //else messageKey = 'message.cobblemoneternal.multiple_stats_maximized'


    entry.forEach(stat => {
        /*
        console.log(stat)
        pokemon.ivs.forEach(iv => console.log(iv))
        */

        if(usingLimiter){
            if(IVMap[stat] > 0){
                pokemon.setIV(stat, 0)
                //if(!statsBoosted.isEmpty())
                //    statsBoosted.append(Text.translate('message.cobblemoneternal.message_separator'))
                statsBoosted.append(Text.translate(`cobblemon.stat.${stat.identifier.path}.name`))

                if(!used) {
                    used = true
                    soundEvent.sound = 'cobblemon:item.medicine.candy.use'
                    soundEvent.volume = 0.7
                }
            }
        } else if(IVMap[stat] < 31){
            pokemon.setIV(stat, 31)
            //if(!statsBoosted.isEmpty())
            //    statsBoosted.append(Text.translate('message.cobblemoneternal.message_separator'))
            statsBoosted.append(Text.translate(`cobblemon.stat.${stat.identifier.path}.name`))

            if(!used) {
                used = true
                soundEvent.sound = 'minecraft:entity.player.levelup'
                soundEvent.volume = 0.7
            }
        }
    })

    if(used){
        player.swing(event.hand, true)
        global.playSoundNear(player, null, soundEvent.sound, 'neutral', soundEvent.volume, soundEvent.pitch)
        console.log(pokemon.getDisplayName())
        player.setStatusMessage(Text.translate(messageKey, pokemon.getDisplayName(), statsBoosted))
        if(!player.isCreative())
            event.item.count--
    }
})