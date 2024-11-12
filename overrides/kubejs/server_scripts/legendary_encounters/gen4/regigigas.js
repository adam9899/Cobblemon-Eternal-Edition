
//Regigigas
global.staticConditionalEncounters.regigigas = {
    species: 'regigigas',
    properties: {
        dexNumber: 486, //TEMPORARY, PokemonSpecies.getByIdentifier() does not exist in this version, so we use getByPokedexNumber() until we update
        level: 70,
        moveSet: [
            'crushgrip',
            'knockoff',
            'earthquake',
            'protect'
        ],
        maxedIVs: 3,
        heldItem: Item.of('cobblemon:leftovers')
    },
    interactWith: 'cobblemoneternal:regigigas_core',
    spawnSound: 'minecraft:block.note_block.bell',
    spawnOffset: {
        x: 0,
        y: 3,
        z: 0
    },
    multiblockName: 'sleeping_giant',
    condition: (player, block, rotation) => {
        if(validateMultiblock('sleeping_giant', block, rotation)){
            let hasRegis = [false, false, false, false, false]

            partyOf(player).forEach(pokemon => {
                console.log(pokemon.species.resourceIdentifier)
                switch (pokemon.species.resourceIdentifier) {
                    case 'cobblemon:regirock':
                        hasRegis[0] = true
                        break;
                    case 'cobblemon:regice':
                        hasRegis[1] = true
                        break;
                    case 'cobblemon:registeel':
                        hasRegis[2] = true
                        break;
                    case 'cobblemon:regieleki':
                        hasRegis[3] = true
                        break;
                    case 'cobblemon:regidrago':
                        hasRegis[4] = true
                        break;
                    default:
                        break;
                }
            })
            
            console.log(hasRegis)

            if(hasRegis[0]
                && hasRegis[1]
                && hasRegis[2]
                && hasRegis[3]
                && hasRegis[4])
                return 'pass';
            else {
                player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_condition'))
                return 'fail_party_condition';
            }
        } else {
            player.setStatusMessage(Text.translate('message.cobblemoneternal.missing_multiblock'))
            return 'fail_multiblock';
        }
    }
}