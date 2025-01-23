

global.loadRegis = () => {

    //Regigigas
    global.staticConditionalEncounters.regigigas = {
        species: 'regigigas',
        properties: {
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
            if(global.validateMultiblock('sleeping_giant', block, rotation)){
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
                
                console.log(hasRegis, !hasRegis.includes(false))

                if(!hasRegis.includes(false))
                    return 'pass';
                else {
                    player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_condition')
                        .color('red')) 
                    return 'fail_party_condition';
                }
            } else {
                player.setStatusMessage(Text.translate('message.cobblemoneternal.missing_multiblock')
                    .color('red')) 
                return 'fail_multiblock';
            }
        }
    }

}