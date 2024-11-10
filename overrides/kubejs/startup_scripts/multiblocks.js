//priority: 0

//const $PatchouliAPI = Java.loadClass('vazkii.patchouli.api.stub.StubPatchouliAPI').INSTANCE
const $PatchouliAPI = Java.loadClass('vazkii.patchouli.api.PatchouliAPI').get()

const $DenseMultiblock = Java.loadClass('vazkii.patchouli.common.multiblock.DenseMultiblock')
const $StateMatcher = Java.loadClass('vazkii.patchouli.common.multiblock.StateMatcher')
const $StringStateMatcher = Java.loadClass('vazkii.patchouli.common.multiblock.StringStateMatcher')

const $Character = Java.loadClass('java.lang.Character')


//Storage for Patchouli Multiblock objects
// for quicker reference in other scripts
global.customMultiblocks = {}


//*
//Cloning Machine
// used for Mewtwo
StartupEvents.postInit(event => {
        
    $PatchouliAPI.registerMultiblock(`cobblemoneternal:cloning_machine`,
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

    console.log(Block.getBlock('minecraft:iron_block'))


    console.log(global.customMultiblocks, global.customMultiblocks['cloning_machine'])

})
//*/