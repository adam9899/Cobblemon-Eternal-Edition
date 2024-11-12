
//Mewtwo
global.staticConditionalEncounters.mewtwo = {
    species: 'cobblemon:mewtwo',
    interactWith: 'cobblemoneternal:cloning_machine_core',
    spawnSound: 'minecraft:block.note_block.bell',
    spawnOffset: {
        x: 0,
        y: 1,
        z: 0
    },
    properties: {
        dexNumber: 150, //TEMPORARY, PokemonSpecies.getByIdentifier() does not exist in this version, so we use getByPokedexNumber() until we update
        level: 80,
        moveSet: [
            'psystrike',
            'aurasphere',
            'shadowball',
            'recover'
        ],
        maxedIVs: 3
    },
    multiblockName: 'cloning_machine',
    condition: (player, block, rotation) => {
        if(validateMultiblock('cloning_machine', block, rotation))
            return 'pass';
        else {
            player.setStatusMessage(Text.translate('message.cobblemoneternal.missing_multiblock')) 
            return 'fail_multiblock';
        }
    },
}