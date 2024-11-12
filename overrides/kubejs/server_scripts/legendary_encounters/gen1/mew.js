
//Mew
global.roamingConditionalEncounters.mew = {
    species: 'cobblemon:mew',
    spawnSound: 'minecraft:block.note_block.bell',
    properties: {
        dexNumber: 151, //TEMPORARY, PokemonSpecies.getByIdentifier() does not exist in this version, so we use getByPokedexNumber() until we update
        level: 60,
        moveSet: [
            'psychic',
            'dazzlinggleam',
            'lifedew',
            'reflecttype'
        ],
        maxedIVs: 3,
        heldItem: Item.of('cobblemoneternal:mewtant_genome')

    },
    condition: (player) => {
        let highFriendshipMon = 0
        partyOf(player).forEach(pokemon => {
            if(pokemon.friendship > 220) highFriendshipMon++
        })
        if(highFriendshipMon < 3 || playerIsInBiome(player, 'forge:is_jungle')) return false;
        return true;
    }
}