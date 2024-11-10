//priority: 5

const $PatchouliAPI = Java.loadClass('vazkii.patchouli.api.PatchouliAPI').get()


NetworkEvents.dataReceived('showMultiblock', event => {
    console.log(`trying to display ${event.data.targetMultiblock}`, event.data)
    let pos = event.data.position

    console.log(
        global.customMultiblocks[event.data.targetMultiblock],
        `multiblock.cobblemoneternal.${event.data.targetMultiblock}.name`,
        new BlockPos(pos.x, pos.y, pos.z),
        event.data.rotation
    )

    $PatchouliAPI.showMultiblock(
        global.customMultiblocks[event.data.targetMultiblock],
        Text.translate(`multiblock.cobblemoneternal.${event.data.targetMultiblock}.name`),
        new BlockPos(pos.x, pos.y - 1, pos.z),
        event.data.rotation //facingToRotation[event.block.properties.facing]
    )
})