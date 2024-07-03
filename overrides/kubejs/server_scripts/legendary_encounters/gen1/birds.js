
const spawnDifferentLegendaryBird = (thisBird) => {
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
    flyingHeight: 12,
    condition: (player) => {
        if(!player.level.raining // clear weather
        && (player.level.time % dayLength) < duskTime // before Dusk
        && (player.level.time % dayLength) > dawnTime // after Dawn
        && playerIsInBiome(player, '#forge:is_desert')){ // in a Desert biome
            return true;
        } else {
            return false;
        }
    },
    alreadyOwns: (player) => spawnDifferentLegendaryBird('moltres')
}


//Zapdos
global.roamingConditionalEncounters.zapdos = {
    species: 'cobblemon:zapdos',
    flyingHeight: 12,
    condition: (player) => {
        if(player.level.thundering // during a Thunderstorm
        && playerIsInBiome(player, '#forge:is_mountainous')){ // in a Mountainous biome
            return true;
        } else {
            return false;
        }
    },
    alreadyOwns: (player) => spawnDifferentLegendaryBird('zapdos')
}


//Articuno
global.roamingConditionalEncounters.articuno = {
    species: 'cobblemon:articuno',
    flyingHeight: 12,
    condition: (player) => {
        if(player.level.raining
        && playerIsInBiome(player, '#forge:is_snowy')){
            return true;
        } else {
            return false
        }
    },
    alreadyOwns: (player) => spawnDifferentLegendaryBird('articuno')
}