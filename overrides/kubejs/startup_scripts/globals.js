//priority: 10

const $CobblemonAPI = Java.loadClass('com.cobblemon.mod.common.Cobblemon').INSTANCE


//get the player's Party
/**
* @param {PlayerJS} player 
* @returns {Pokemon[]}
*/
global.partyOf = (player) => {
    return $CobblemonAPI.getStorage().getParty(player)
}


//returns the highest Level among the player's Party.
/**
 * @param {Player}
 */
global.partyLevel = (player) => {
    let highestLevel = 1
    $CobblemonAPI.getStorage().getParty(player).forEach(pokemon => {
        if(pokemon.level > highestLevel)
            highestLevel = pokemon.level
    })
    return highestLevel
}


//check if the player is a Biome which has the given Tag
/**
* @param {PlayerJS} player player to evaluate
* @param {ResourceLocation} biomeTag biome tag ID. no '#' prefix.s
* @returns {boolean}
*/
global.playerIsInBiome = (player, biomeTag) => {
    let biomeHasTag = player.level.getBiome(player.blockPosition())
        .tags()
        .anyMatch((tag) => tag.location().toString() == biomeTag)
    return biomeHasTag
}


global.playSoundNear = (player, sourceEntity, sound, sourceType, volume, pitch) => {
    player.level['playSound(net.minecraft.world.entity.player.Player,double,double,double,net.minecraft.sounds.SoundEvent,net.minecraft.sounds.SoundSource,float,float)']
            (sourceEntity, player.x, player.y, player.z, sound, sourceType, volume, pitch)
}