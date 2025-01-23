//priority: 10

//const $PatchouliAPI = Java.loadClass('vazkii.patchouli.api.stub.StubPatchouliAPI').INSTANCE
const $PatchouliAPI = Java.loadClass('vazkii.patchouli.api.PatchouliAPI').get()

const $DenseMultiblock = Java.loadClass('vazkii.patchouli.common.multiblock.DenseMultiblock')
const $StateMatcher = Java.loadClass('vazkii.patchouli.common.multiblock.StateMatcher')
const $StringStateMatcher = Java.loadClass('vazkii.patchouli.common.multiblock.StringStateMatcher')

const $Character = Java.loadClass('java.lang.Character')


//*
//Cloning Machine
// used for Mewtwo
StartupEvents.postInit(event => {

    //Storage for Patchouli Multiblock objects
    // for quicker reference in other scripts
    global.customMultiblocks = {}
        
    $PatchouliAPI.registerMultiblock('cobblemoneternal:cloning_machine',
        $PatchouliAPI.makeMultiblock(
            [
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

    $PatchouliAPI.registerMultiblock('cobblemoneternal:sleeping_giant',
        $PatchouliAPI.makeMultiblock(
            [
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

    console.log(global.customMultiblocks, global.customMultiblocks['cloning_machine'])

})
//*/