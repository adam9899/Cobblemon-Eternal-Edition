//priority: 5



const facingToRotation = {
    'south': 'none',
    'north': 'clockwise_180',
    'east': 'counterclockwise_90',
    'west': 'clockwise_90'
}

let posWithOffset = (pos, entry, axis) => {
    return pos[axis] + (entry.spawnOffset ? entry.spawnOffset[axis] : 0)
}

const tryStaticEncounter = (event) => {
    let entry = global.staticConditionalEncounters[global.registeredStatics[event.block.id]]
    let multiblock = global.customMultiblocks[entry.multiblockName]
    let pos = event.block.pos
    let conditionResult = entry.condition(event.player, event.block, event.block.properties.facing ? facingToRotation[event.block.properties.facing] : undefined)

    console.log(`${event.player.username} clicked on ${event.block.id} at ${pos.x}x ${pos.y}y ${pos.z}z`, entry, multiblock)

    if(conditionResult == 'pass'){
        event.server.runCommandSilent(
            `pokespawnat ${posWithOffset(pos, entry, 'x')} ${posWithOffset(pos, entry, 'y')} ${posWithOffset(pos, entry, 'z')} ${entry.species}`
        )

        if(entry.spawnSound)
            event.server.runCommandSilent(`playsound ${entry.spawnSound} neutral ${event.player.username} ${posWithOffset(pos, entry, 'x')} ${posWithOffset(pos, entry, 'y')} ${posWithOffset(pos, entry, 'z')}`)
    }

    if(entry.multiblockName && conditionResult == 'fail_multiblock'){
        event.player.sendData('showMultiblock', {targetMultiblock: entry.multiblockName, position: {x: pos.x, y: pos.y, z: pos.z}, rotation: facingToRotation[event.block.properties.facing]})
    }
    
}


BlockEvents.rightClicked(event => {
    if(event.player.crouching || event.hand == 'OFF_HAND' || !event.block.hasTag('cobblemoneternal:static_spawner_block')) return;

    //console.log(event.block.level, event.block.pos, event.block.properties)

    event.player.swing('MAIN_HAND', true)
    tryStaticEncounter(event)
})