//priority: 5

const $PatchouliAPI = Java.loadClass('vazkii.patchouli.api.PatchouliAPI').get()
const $VisualizationHandler = Java.loadClass('vazkii.patchouli.client.handler.MultiblockVisualizationHandler')


NetworkEvents.dataReceived('showMultiblock', event => {
    //console.log(`trying to display ${event.data.targetMultiblock}`, event.data)
    let multiblock = event.data.getString('targetMultiblock')
    let legalMultiblockName = `cobblemoneternal:${multiblock}`
    let pos = event.data.getCompound('position')
    let rotation = global.facingToRotation[event.data.getString('orientation')]

    /*
    console.log(
        global.customMultiblocks[multiblock].getID(),
        `multiblock.cobblemoneternal.${multiblock}.name`,
        new BlockPos(pos.getInt('x'), pos.getInt('y'), pos.getInt('z')),
        `Rotation: ${rotation}`
    )
    */

    //
    if($PatchouliAPI.getCurrentMultiblock() != undefined
        && legalMultiblockName != $PatchouliAPI.getCurrentMultiblock().getID())
        $PatchouliAPI.clearMultiblock()

    // Display Multiblock
    $PatchouliAPI.showMultiblock(
        $PatchouliAPI.getMultiblock(legalMultiblockName),
        Text.translate(`multiblock.cobblemoneternal.${multiblock}.name`),
        new BlockPos(pos.getInt('x'), pos.getInt('y') - 1, pos.getInt('z')),
        rotation
    )

    event.player.playSound('minecraft:block.note_block.chime')

    //console.log('Current Multiblock: '+ $PatchouliAPI.getCurrentMultiblock().getID())
})

NetworkEvents.dataReceived('clearMultiblock', event => {
    if($PatchouliAPI.getCurrentMultiblock() != undefined)
        $PatchouliAPI.clearMultiblock()
})