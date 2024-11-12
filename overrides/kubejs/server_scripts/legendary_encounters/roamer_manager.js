//priority: 5


//spawn a Roaming Legendary pokemon near the player
/**
* @param {PlayerJS} player
* @param {Map<string, string | Function>} spawnDetails
* @param {boolean} bypassConditions
*/
const trySpawnRoamingLegendary = (player, spawnDetails, bypassConditions) => {
    let {x, y, z, level} = player
    let pos = level.getBlockRandomPos(x, y, z, 32)
    /*BlockPos.of(
        x + Math.round(Math.random() * 32) - 16,
        y + Math.round(Math.random() * 16) - 8,
        z + Math.round(Math.random() * 32) - 16
    )*/
    bypassConditions = bypassConditions || false // for forcing spawns from '/forceroaminglegendaryspawn'

    let alreadyOwns = false
    partyOf(player).forEach(pokemon => {
        if(pokemon.species == spawnDetails.species)
            alreadyOwns = true;
    })
    if(alreadyOwns)
        if(spawnDetails.alreadyOwns){
            spawnDetails.alreadyOwns()
        } else {
            if(Math.random() < roamerRerollSuccessRate) return;
            trySpawnRoamingLegendary(player, getRandomRoamer())
        }

    if(!(bypassConditions || spawnDetails.condition(player))) return;

    //set the player's roamer limiter flag, cause at this point, it's getting spawned.
    player.persistentData.dailyRoamerSuccesses += 1

    console.log('Y position adjustment starting')
    if(spawnDetails.flyingHeight){
        console.log(`${spawnDetails.species} is a flyer, looking for a surface to spawn above`)
        for (let currentY = 255; currentY < pos.y; currentY--){
            if(level.getBlock(pos.x, currentY, pos.z) != 'minecraft:air'){
                pos = level.getBlock(pos.x, currentY + spawnDetails.flyingHeight, pos.z).pos
                break;
            }
        }
    } else {
        console.log(`${spawnDetails.species} is not a flyer, looking for a ground position`)
        if(!spawnDetails.canBeUnderground) pos = level.getBlock(pos.x, 60, pos.z).pos
        let lastBlockWasAir = false
        for (let currentY = pos.y; currentY < 255; currentY++){
            if(level.getBlock(pos.x, currentY, pos.z) == 'minecraft:air'){
                if(lastBlockWasAir){
                    pos = level.getBlock(pos.x, currentY, pos.z).pos
                    console.log(`Valid pos found at ${pos}`)
                    break;
                }
                lastBlockWasAir = true
            } else {
                lastBlockWasAir = false
            }
        }
    }
    console.log('Y position adjustment done')

    level.getEntitiesWithin(AABB.ofBlock(pos).inflate(64))
        .filter(entity => entity.type == 'minecraft:player')
        .forEach(player => {
            let speciesName = spawnDetails.species.split(':')
            console.log(player)
            player.setStatusMessage(Text.translate(`${speciesName[0]}.species.${speciesName[1]}.name`).append(Text.translate('message.cobblemoneternal.legendary_spawned_nearby')))
            player.level.playSound(null, player.x, player.y, player.z, spawnDetails.spawnSound, 'neutral', 1, 1)
        })

    console.log(spawnDetails)
    let pokemonEntity = new $PokemonEntity(level, createPokemon(spawnDetails.species, spawnDetails.properties), $CobblemonEntities.POKEMON)
    console.log(pokemonEntity)
        pokemonEntity.x = pos.x
        pokemonEntity.y = pos.y
        pokemonEntity.z = pos.z
        pokemonEntity.spawn()

    console.log(`${spawnDetails.species} created at ${pos.x}x ${pos.y}y ${pos.z}z near ${player.username}. forced: ${bypassConditions}`)
}


//the engine, so to speak
// attempts to spawn a Roamer every X ticks (default 7000, + or - 1000 based on UUID [NYI]), with a 20% chance of success, if one has not already spawned with in the day
// there is no weighting to this, it simply picks one at random from the list and runs its check, spawning it if it succeeds
PlayerEvents.tick(event => {
    if(!event.level.remote){
        if(event.level.time % roamingLegendaryCheckFrequency == 0){
            console.log(`running Roamer check for ${event.player.username} at ${event.level.time}`)
            if(event.player.persistentData.dailyRoamerSuccesses < maxRoamersPerDay
                && Math.random() > (1.0 - roamerSpawnCheckSuccessRate)){
                console.log(`attempting roaming legendary spawn near ${event.player.username}`)
                
                trySpawnRoamingLegendary(
                    event.player,
                    getRandomRoamer()
                )
            }
        }

        if(event.level.time % dayLength == 0){
            event.player.persistentData.dailyRoamerSuccesses = 0
        }
    }
})


/**
* @param {PlayerJS} player 
* @param {string} species 
* @returns {boolean}
*/
const forceSpawnRoamerNear = (player, species) => {
    trySpawnRoamingLegendary(player, global.roamingConditionalEncounters[species], true)
    return 1;
}

ServerEvents.commandRegistry(event => {
    const {commands: Commands, arguments: Arguments, builtinSuggestions: Suggestions} = event

    //Command to force a Roaming legendary to spawn near a player
    // '/forceroaminglegendaryspawn <species> [<player>]'
    // ex: '/forceroaminglegendaryspawn moltres Emmerdog' spawns a Moltres near player Emmerdog
    event.register(
        Commands.literal('forceroaminglegendaryspawn')
            .requires(source => source.hasPermission(2))
            .then(Commands.argument('species', Arguments.WORD.create(event))
                //.suggests(builder => Suggestions.suggests(global.registeredRoamers, builder))
                .executes(ctx => {
                    let player = ctx.source.player
                    let species = Arguments.WORD.getResult(ctx, 'species')
                    player.tell(
                        Text.translate('message.cobblemoneternal.command.force_spawn_success')
                        //.with([species, player.username])
                    )
                    return forceSpawnRoamerNear(player, species)
                })
                .then(Commands.argument('player', Arguments.PLAYER.create(event))
                    .executes(ctx => {
                        let player = Arguments.PLAYER.getResult(ctx, 'player')
                        let species = Arguments.WORD.getResult(ctx, 'species')
                        if(ctx.source.player)
                            ctx.source.player.tell(
                                Text.translate('message.cobblemoneternal.command.force_spawn_success')
                                //.with([species, player.username])
                            )
                        return forceSpawnRoamerNear(player, species)
                    })
                )
            )
    )
})