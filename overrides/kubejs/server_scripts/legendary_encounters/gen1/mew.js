
//Mew
global.roamingConditionalEncounters.mew = {
    species: 'cobblemon:mew',
    condition: (player) => {
        let highFriendshipMon = 0
        partyOf(player).forEach(pokemon => {
            if(pokemon.friendship > 220) highFriendshipMon++
        })
        if(highFriendshipMon < 3) return false;
        return true;
    }
}