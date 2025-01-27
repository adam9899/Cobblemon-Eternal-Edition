
global.loadMewDuo = () => {
    
    //Mew
    global.roamingConditionalEncounters.mew = {
        species: 'cobblemon:mew',
        weight: 10,
        spawnSound: 'minecraft:block.note_block.bell',
        properties: {
            level: 50,
            moveSet: [
                'psychic',
                'dazzlinggleam',
                'lifedew',
                'reflecttype'
            ],
            maxedIVs: 3
            //heldItem: Item.of('cobblemoneternal:mewtant_genome')
        },
        condition: (player) => {
            if(!global.partyLevel(player) >= 40 || !playerIsInBiome(player, 'forge:is_jungle')) return false;

            let highFriendshipMon = 0
            global.partyOf(player).forEach(pokemon => {
                if(pokemon.friendship > 220) highFriendshipMon++
            })
            if(highFriendshipMon < 3) return false;
            return true;
        }
    }


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
            level: 60,
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
            if(global.validateMultiblock('cloning_machine', block, rotation)) {
                if(global.partyLevel(player) < 50) {
                    player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_level', '50'))
                    return 'fail_party_level';
                }
                return 'pass';
            } else {
                player.setStatusMessage(Text.translate('message.cobblemoneternal.missing_multiblock')
                    .color('red')) 
                return 'fail_multiblock';
            }
        }
    }
}
