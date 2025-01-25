
//Regirock
global.multiblockRegistryList.push({
    register: () => { 
        // "Stone Shrine"
        $PatchouliAPI.registerMultiblock('cobblemoneternal:stone_shrine',
            $PatchouliAPI.makeMultiblock(
                [
                    //PLACEHOLDER
                    [
                        '  ',
                        ' C',
                        '  '
                    ],
                    [
                        'DD',
                        'D0',
                        'DD'
                    ]
                ],
                new $Character('0'), $StringStateMatcher.fromString('cobblemoneternal:stone_shrine_core'),
                new $Character('D'), Block.getBlock('minecraft:dripstone_block'),
                new $Character('C'), Block.getBlock('minecraft:pointed_dripstone')
            )
        )

        global.customMultiblocks['stone_shrine'] = $PatchouliAPI.getMultiblock('cobblemoneternal:stone_shrine')


        // "Ice Shrine"
        $PatchouliAPI.registerMultiblock('cobblemoneternal:ice_shrine',
            $PatchouliAPI.makeMultiblock(
                [
                    //PLACEHOLDER
                    [
                        '  ',
                        ' P',
                        '  '
                    ],
                    [
                        'II',
                        'I0',
                        'II'
                    ]
                ],
                new $Character('0'), $StringStateMatcher.fromString('cobblemoneternal:ice_shrine_core'),
                new $Character('I'), Block.getBlock('minecraft:packed_ice'),
                new $Character('P'), Block.getBlock('minecraft:carved_pumpkin')
            )
        )

        global.customMultiblocks['ice_shrine'] = $PatchouliAPI.getMultiblock('cobblemoneternal:ice_shrine')


        // "Steel Shrine"
        $PatchouliAPI.registerMultiblock('cobblemoneternal:steel_shrine',
            $PatchouliAPI.makeMultiblock(
                [
                    //PLACEHOLDER
                    [
                        '  ',
                        ' G',
                        '  '
                    ],
                    [
                        'II',
                        'I0',
                        'II'
                    ]
                ],
                new $Character('0'), $StringStateMatcher.fromString('cobblemoneternal:steel_shrine_core'),
                new $Character('I'), Block.getBlock('minecraft:iron_block'),
                new $Character('G'), Block.getBlock('minecraft:gold_block')
            )
        )

        global.customMultiblocks['steel_shrine'] = $PatchouliAPI.getMultiblock('cobblemoneternal:steel_shrine')

        
        // "Sleeping Giant"
        $PatchouliAPI.registerMultiblock('cobblemoneternal:sleeping_giant',
            $PatchouliAPI.makeMultiblock(
                [
                    //PLACEHOLDER
                    [
                        'SS',
                        'SS',
                        'SS',
                        'SS',
                        'SS',
                        'SS',
                        'SS'
                    ],
                    [
                        'SS',
                        'SS',
                        'SS',
                        'SS',
                        'SS',
                        'SS',
                        'SS'
                    ],
                    [
                        'SS',
                        'SS',
                        'SS',
                        'S0',
                        'SS',
                        'SS',
                        'SS'
                    ],
                    [
                        'SS',
                        'SS',
                        'SS',
                        'SS',
                        'SS',
                        'SS',
                        'SS'
                    ],
                    [
                        '  ',
                        'SS',
                        'SS',
                        '  ',
                        'SS',
                        'SS',
                        '  '
                    ],
                    [
                        '  ',
                        'SS',
                        'SS',
                        '  ',
                        'SS',
                        'SS',
                        '  '
                    ]
                ],
                new $Character('0'), $StringStateMatcher.fromString('cobblemoneternal:regigigas_core'),
                new $Character('S'), Block.getBlock('minecraft:stone')
            )
        )
    
        global.customMultiblocks['sleeping_giant'] = $PatchouliAPI.getMultiblock('cobblemoneternal:sleeping_giant')


        // "Storm Shrine"
        $PatchouliAPI.registerMultiblock('cobblemoneternal:storm_shrine',
            $PatchouliAPI.makeMultiblock(
                [
                    //PLACEHOLDER
                    [
                        '  ',
                        ' B',
                        '  '
                    ],
                    [
                        'HH',
                        'H0',
                        'HH'
                    ]
                ],
                new $Character('0'), $StringStateMatcher.fromString('cobblemoneternal:storm_shrine_core'),
                new $Character('H'), Block.getBlock('minecraft:hay_block'),
                new $Character('B'), Block.getBlock('minecraft:target')
            )
        )

        global.customMultiblocks['storm_shrine'] = $PatchouliAPI.getMultiblock('cobblemoneternal:storm_shrine')


        // "Draconic Shrine"
        $PatchouliAPI.registerMultiblock('cobblemoneternal:dragon_shrine',
            $PatchouliAPI.makeMultiblock(
                [
                    //PLACEHOLDER
                    [
                        '  ',
                        ' D',
                        '  '
                    ],
                    [
                        'NN',
                        'N0',
                        'NN'
                    ]
                ],
                new $Character('0'), $StringStateMatcher.fromString('cobblemoneternal:dragon_shrine_core'),
                new $Character('N'), Block.getBlock('minecraft:nether_bricks'),
                new $Character('D'), Block.getBlock('minecraft:dragon_head')
            )
        )

        global.customMultiblocks['dragon_shrine'] = $PatchouliAPI.getMultiblock('cobblemoneternal:dragon_shrine')
    }
})