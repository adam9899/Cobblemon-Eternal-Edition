
const spawnDifferentLegendaryBird = (player, thisBird) => {
    let legendaryBirds = [
        'moltres',
        'zapdos',
        'articuno'
    ]
    legendaryBirds.remove(thisBird)
    let target = Math.floor(Math.random() * legendaryBirds.length)
    trySpawnRoamingLegendary(player, global.roamingConditionalEncounters[otherBirds[target]])
}

//Moltres
global.roamingConditionalEncounters.moltres = {
    species: 'cobblemon:moltres',
    flyingHeight: 6,
    spawnSound: 'minecraft:block.note_block.bell',
    condition: (player) => {
        /*
        let dayTime = player.level.time % dayLength
        console.log(dayTime, dayTime < duskTime, dayTime > dawnTime.end)
        && dayTime < duskTime // before Dusk
        && dayTime > dawnTime.end
        */
       /*
        console.log(
            !player.level.raining,
            player.level.getBrightness('sky', player.blockPosition()) > 10,
            playerIsInBiome(player, 'forge:is_desert')
        )
        */
        if(!player.level.raining // Clear weather
        && player.level.getBrightness('sky', player.blockPosition()) > 10 // Skylight level 10
        && playerIsInBiome(player, 'forge:is_desert')){ // in a Desert biome
            return true;
        } else {
            return false;
        }
    },
    alreadyOwns: (player) => spawnDifferentLegendaryBird(player, 'moltres')
}


//Zapdos
global.roamingConditionalEncounters.zapdos = {
    species: 'cobblemon:zapdos',
    flyingHeight: 6,
    spawnSound: 'minecraft:block.note_block.bell',
    condition: (player) => {
        if(player.level.thundering // during a Thunderstorm
        && playerIsInBiome(player, 'forge:is_mountainous')){ // in a Mountainous biome
            return true;
        } else {
            return false;
        }
    },
    alreadyOwns: (player) => spawnDifferentLegendaryBird(player, 'zapdos')
}


//Articuno
global.roamingConditionalEncounters.articuno = {
    species: 'cobblemon:articuno',
    flyingHeight: 6,
    spawnSound: 'minecraft:block.note_block.bell',
    condition: (player) => {
        if(player.level.raining
        && playerIsInBiome(player, 'forge:is_snowy')){
            return true;
        } else {
            return false
        }
    },
    alreadyOwns: (player) => spawnDifferentLegendaryBird(player, 'articuno')
}