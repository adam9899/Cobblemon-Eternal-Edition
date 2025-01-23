let birds = []


global.loadLegendaryBirds = () => {

    //Moltres
    global.roamingConditionalEncounters.moltres = {
        species: 'cobblemon:moltres',
        group: 'legendaryBirds',
        weight: 10,
        flyingHeight: 6,
        spawnSound: 'minecraft:block.note_block.bell',
        textColor: 'red',
        properties: {
            level: 50,
            moveSet: [
                'temperflare',
                'hurricane',
                'ancientpower',
                'sunnyday'
            ],
            maxedIVs: 3
        },
        condition: (player) => {
            /*
            console.log(
                !player.level.raining,
                player.level.getBrightness('sky', player.blockPosition()) > 10,
                playerIsInBiome(player, 'forge:is_desert')
            )
            */
            if(!player.level.raining // Clear weather
            && player.level.getBrightness('sky', player.blockPosition()) > 10 // Skylight level 10
            && global.playerIsInBiome(player, 'cobblemon:is_desert')){ // in a Desert biome
                return true;
            } else {
                return false;
            }
        },
        alreadyOwns: (player, species) => global.spawnOtherMemberOfGroup(player, species)
    }


    //Zapdos
    global.roamingConditionalEncounters.zapdos = {
        species: 'cobblemon:zapdos',
        weight: 10,
        flyingHeight: 6,
        spawnSound: 'minecraft:block.note_block.bell',
        textColor: 'yellow',
        properties: {
            level: 50,
            moveSet: [
                'electroball',
                'hurricane',
                'thunderwave',
                'raindance'
            ],
            maxedIVs: 3
        },
        condition: (player) => {
            if(player.level.thundering // during a Thunderstorm
            && global.playerIsInBiome(player, 'cobblemon:is_mountain')){ // in a Mountainous biome
                return true;
            } else {
                return false;
            }
        },
        alreadyOwns: (player, species) => global.spawnOtherMemberOfGroup(player, species)
    }


    //Articuno
    global.roamingConditionalEncounters.articuno = {
        species: 'cobblemon:articuno',
        weight: 10,
        flyingHeight: 6,
        spawnSound: 'minecraft:block.note_block.bell',
        textColor: 'blue',
        properties: {
            level: 50,
            moveSet: [
                'blizzard',
                'roost',
                'auroraveil',
                'snowscape'
            ],
            maxedIVs: 3
        },
        condition: (player) => {
            if(player.level.raining
            && global.playerIsInBiome(player, 'cobblemon:is_snowy')){
                return true;
            } else {
                return false
            }
        },
        alreadyOwns: (player, species) => global.spawnOtherMemberOfGroup(player, species),
    }

}