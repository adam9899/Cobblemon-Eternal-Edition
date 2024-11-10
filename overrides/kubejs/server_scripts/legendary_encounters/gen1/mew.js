
//Mew
global.roamingConditionalEncounters.mew = {
    species: 'cobblemon:mew',
    spawnSound: 'minecraft:block.note_block.bell',
    condition: (player) => {
        let highFriendshipMon = 0
        partyOf(player).forEach(pokemon => {
            if(pokemon.friendship > 220) highFriendshipMon++
        })
        if(highFriendshipMon < 3 || playerIsInBiome(player, 'forge:is_jungle')) return false;
        return true;
    }
}