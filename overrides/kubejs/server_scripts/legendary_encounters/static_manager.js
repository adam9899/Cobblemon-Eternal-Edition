//priority: 5

let posWithOffset = (pos, entry, axis) => {
    return pos[axis] + (entry.spawnOffset ? entry.spawnOffset[axis] : 0)
}

const tryStaticEncounter = (event) => {
    let entry = global.staticConditionalEncounters[global.registeredStatics[event.block.id]]
    let multiblock = global.customMultiblocks[entry.multiblockName]
    let pos = event.block.pos
    console.log(event.block.properties.facing)
    let conditionResult = entry.condition(event.player, event.block, 
        event.block.properties.facing ? global.facingToRotation[event.block.properties.facing] : undefined)

    console.log(`${event.player.username} clicked on ${event.block.id} at ${pos.x}x ${pos.y}y ${pos.z}z`, entry, multiblock)

    if(conditionResult == 'pass'){

        let pokemonEntity = new $PokemonEntity(event.level, createPokemon(entry.species, entry.properties), $CobblemonEntities.POKEMON)
            pokemonEntity.x = posWithOffset(pos, entry, 'x') + 0.5
            pokemonEntity.y = posWithOffset(pos, entry, 'y')
            pokemonEntity.z = posWithOffset(pos, entry, 'z') + 0.5
            pokemonEntity.spawn()

        if(entry.spawnSound)
            event.server.runCommandSilent(`playsound ${entry.spawnSound} neutral ${event.player.username} ${posWithOffset(pos, entry, 'x')} ${posWithOffset(pos, entry, 'y')} ${posWithOffset(pos, entry, 'z')}`)
    } 
    else if(entry.multiblockName && conditionResult == 'fail_multiblock'){
        event.player.sendData('showMultiblock', {
            targetMultiblock: entry.multiblockName,
            position: {x: pos.x, y: pos.y, z: pos.z},
            orientation: event.block.properties.facing
        })
    }
    
}


BlockEvents.rightClicked(event => {
    if(event.hand == 'OFF_HAND' || !event.block.hasTag('cobblemoneternal:static_spawner_block')) return;
    
    if(event.player.crouching) {
        event.player.sendData('clearMultiblock', {})
        event.player.swing('MAIN_HAND', true)
        return;
    }

    //console.log(event.block.level, event.block.pos, event.block.properties)

    event.player.swing('MAIN_HAND', true)
    tryStaticEncounter(event)
})