

global.multiblockRegistryList.push({
    register: () => {
        $PatchouliAPI.registerMultiblock('cobblemoneternal:cloning_machine',
            $PatchouliAPI.makeMultiblock(
                [
                    //PLACEHOLDER
                    [
                        '  ',
                        ' A',
                        '  ',
                        ' A',
                        '  '
                    ],
                    [
                        'AA',
                        ' A',
                        'A0',
                        ' A',
                        'AA'
                    ]
                ],
                new $Character('0'), $StringStateMatcher.fromString('cobblemoneternal:cloning_machine_core'),
                new $Character('A'), Block.getBlock('minecraft:iron_block')
            )
        )
    
        global.customMultiblocks['cloning_machine'] = $PatchouliAPI.getMultiblock('cobblemoneternal:cloning_machine')
    }
})