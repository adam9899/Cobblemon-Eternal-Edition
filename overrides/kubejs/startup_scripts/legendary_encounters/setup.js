//priority: 5

const $CobblemonAPI = Java.loadClass('com.cobblemon.mod.common.Cobblemon').INSTANCE

//Legendary Tables

//Storage for Roaming Encounter data
//may randomly spawn around the player when specific conditions are met
global.roamingConditionalEncounters = {}

//a list of registered Roaming legendary pokemon, because you can't numerically index maps in JS
global.registeredRoamers = []


//Storage for Static Encounter data
//may be summoned in special locations (custom structures) when specific conditions are met
global.staticConditionalEncounters = {}

//a list of registered Static legendary pokemon, so that an encounter can be fetched from its associated block
global.registeredStatics = {}


//a Map containing Lists of Legendary Pokemon Groups
// primarily used for shifting spawns for already owned Legendaries to another of their group
global.legendaryGroups = {}


//Reference map to convert Block Facing into Rotation
global.facingToRotation = {
    'south': 'NONE',
    'north': '180',
    'east': 'COUNTERCLOCKWISE_90',
    'west': 'CLOCKWISE_90'
}

global.copyRoamerGroup = false

let currentGroup = [] // storage for currently iterated group



//get the player's Party
/**
* @param {PlayerJS} player 
* @returns {Pokemon[]}
*/
global.partyOf = (player) => {
    return $CobblemonAPI.getStorage().getParty(player)
}


//function to validate a multiblock with Patchouli
// used in Static Encounter system
/**
* @param {string} multiblock
* @param {BlockContainerJS} block
* @returns {boolean}
*/
global.validateMultiblock = (multiblock, block, rotation) => {
    console.log(global.customMultiblocks, global.customMultiblocks[multiblock])
    if(rotation)
        return global.customMultiblocks[multiblock].validate(block.level, block.pos, rotation)
    else 
        return global.customMultiblocks[multiblock].validate(block.level, block.pos) != null
        //['validate(net.minecraft.world.level.Level,net.minecraft.core.BlockPos)']
}

//Selects a Roamer from the provided list of registered roamers, using a Weight system
// provide no arguments to use the default roamer list.
/**
 * @param {Player} player
 * @param {string[]} legendaryList list of Legendary Pokemon to select from
 */
global.selectRoamingLegendary = (player, legendaryList) => {
    legendaryList = legendaryList || global.registeredRoamers

    let totalWeight = 0;

    legendaryList.forEach((legendary) => {
        let encounter = global.roamingConditionalEncounters[legendary]
        if(encounter.condition(player))
            totalWeight += getWeightOrDefault(encounter.weight)
    })

    let weight = Math.floor(Math.random() * totalWeight)

    global.roamingConditionalEncounters.forEach((encounter) => {
        let encounterWeight = getWeightOrDefault(encounter.weight)
        weight -= encounterWeight
        if(weight < 0)
            return encounter
    })
}

//attempts to Spawn another member of the Legendary Group the given species is a part of.
/**
 * @param {Player} player player to spawn around
 * @param {String} species species ID
 */
global.spawnOtherMemberOfGroup = (player, species) => {
    if(global.copyRoamerGroup) { // only copy and look for group when an initial roamer spawn is tried
        global.copyRoamerGroup = false // don't copy again on the next attempted spawn
        global.legendaryGroups.forEach((group) => { // iterate through known groups to find group this belongs to
            if(group.includes(species))
                currentGroup = group // copy group to local variable
        })
    }
    currentGroup.remove(species) // remove this roamer from the group copy to stop it from trying to spawn again

    global.trySpawnRoamingLegendary( // try to spawn another roamer included in the group copy
        player,
        global.selectRoamingLegendary(player, currentGroup)
    )
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


//shorthand for getting a 'java.lang.Character', which is required for Multiblock Patterns with Patchouli
/**
 * @param {String} character 
 * @returns {Character}
 */
const char = (character) => {
    if(character.length > 1)
        throw `function "char()" was provided \'${character}\', containing multiple Characters!`
    new $Character(character);
}


//Check if the provided value is greater than 0, if false, return 1
// used to default weight to 1 for roaming encounters
/**
 * @param {int} weight 
 * @returns {int}
 */
global.getWeightOrDefault = (weight) => {
    return weight ? weight : 1
}

//Instruct roamer system to be allowed to copy the group of a Roamer to a local variable
// necessary function to prevent recursively and indefinitely trying to reroll into other members of a group, by removing any species the player already owns from the copy of the group
/**
 * @param {bool} bool 
 */
global.setCopyRoamerGroup = (bool) => { // cause global can't be modified outside of startup in kjs 1.21
    bool = bool || true // default to true
    global.copyRoamerGroup = bool
}

//Reload all Encounter data
// flushes lookup tables and storage
// loads base encounters
// loads groups
// copies to lookup tables
global.reloadEncounterData = () => {
    //empty storage to prevent duplicate entries
    flushStorage()

    //load all encounter data
    global.loadAllEncounters()

    //load Legendary Group data
    loadLegendaryGroups()

    //write some encounter info to lookup tables
    transcribeTables()
}

//reset lookup tables
const flushStorage = () => {
    global.roamingConditionalEncounters = {}
    global.registeredRoamers = []
    global.staticConditionalEncounters = {}
    global.registeredStatics = {}
    global.legendaryGroups = {}
}

//load all encounter data
global.loadAllEncounters = () => {

    //load encounters by generation
    // currently unused generations are commented out
    global.loadLegendaryBirds()
    global.loadMewDuo()

    global.loadRegis()
}

//write to lookup tables
const transcribeTables = () => {
    //Transcribe entries in roamingConditionalEncounters into registeredRoamers
    // so you don't have to do it manually
    Object.keys(global.roamingConditionalEncounters).forEach((species) => {
        global.registeredRoamers.push(species)
    });

    //Transcribe entries in staticConditionalEncounters into registeredStatics, associating them with the block you need to interact with to perform their check
    // makes it so you don't need to write the entry with the block name, rather just the species
    Object.keys(global.staticConditionalEncounters).forEach((species) => {
        global.registeredStatics[global.staticConditionalEncounters[species].interactWith] = species
    })


    //log registered roamers
    global.registeredRoamers.forEach(species => {
        console.log(species)
    })

    Object.keys(global.registeredStatics).forEach(block => {
        console.log(global.registeredStatics[block], block)
    })
}