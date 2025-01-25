//priority: 10

//const $PatchouliAPI = Java.loadClass('vazkii.patchouli.api.stub.StubPatchouliAPI').INSTANCE
const $PatchouliAPI = Java.loadClass('vazkii.patchouli.api.PatchouliAPI').get()

const $DenseMultiblock = Java.loadClass('vazkii.patchouli.common.multiblock.DenseMultiblock')
const $StateMatcher = Java.loadClass('vazkii.patchouli.common.multiblock.StateMatcher')
const $StringStateMatcher = Java.loadClass('vazkii.patchouli.common.multiblock.StringStateMatcher')

const $Character = Java.loadClass('java.lang.Character')

//can be flushed on script reload because multiblocks are already registered and stored when reloading is possible.
global.multiblockRegistryList = []

//*
//Cloning Machine
// used for Mewtwo
StartupEvents.postInit(event => {

    //Storage for Patchouli Multiblock objects
    // for quicker reference in other scripts
    global.customMultiblocks = {}

    //register all multiblocks in this array
    // to add a multiblock, use 'global.multiblockRegistryList.push()' in a startup script.
    // provide an object with a noargs function assigned to 'register', insert code to register inside that function.
    global.multiblockRegistryList.forEach(multiblock => multiblock.register())

    console.log(global.customMultiblocks, global.customMultiblocks['cloning_machine'])

})
//*/