//priority: 10

const $CobblemonAPI = Java.loadClass('com.cobblemon.mod.common.Cobblemon').INSTANCE

const $PatchouliAPI = Java.loadClass('vazkii.patchouli.common.base.PatchouliAPIImpl')


//Roaming Legendary updates occur every this long in ticks
// up to 1000 ticks earlier or later in the day based on your UUID (to desynchronize them between players)
// (Note: that does not mean player X has 3 spawns every day while player Y only has 2 spawns per day, rather that player Y's spawns occur 1000 ticks later than player X's, and player Z's occur 1000 earlier)
// default: [7000]
const roamingLegendaryCheckFrequency = 7000

//Chance for a Roaming Legendary check to actually be performed
// this exists to make them not spawn massively frequently and add an element of randomness to when they decide to show up.
const roamerSpawnCheckSuccessRate = 0.2

//Maximum number of Roamers a single player can be the source of per game day
// here if we or a user wants to modify it (such as if a day length extending mod is added)
const maxRoamersPerDay = 1

//Chance for a Roamer check for a species in the player's party will be converted into a different Roamer spawn instead of being cancelled entirely
// basically 
// here if we want to adjust the feel of that
const roamerRerollSuccessRate = 0.5

//length of a day
// here if we or a user wants to modify it (for if a day length extending mod is added)
// default: [24000]
const dayLength = 24000

//time out of a day's length that dawn begins
// default: [23000]
const dawnTime = 23000
//time out of a day's length that dusk begins
// default: [12500]
const duskTime = 12500


//get the player's Party
/**
 * 
 * @param {PlayerJS} player 
 * @returns {Pokemon[]}
 */
const partyOf = (player) => {
    return $CobblemonAPI.getStorage().getParty(player.uuid)
}

//check if the player is a Biome which has the given Tag
/**
* @param {PlayerJS} player 
* @param {ResourceLocation} biomeTag 
* @returns {boolean}
*/
const playerIsInBiome = (player, biomeTag) => {
    return !player.level.getBiome(player.blockPosition()).tags().anyMatch((tag) => {
        tag.location().toString() == biomeTag
    }).toList().isEmpty()
}

//get a random Roaming Legendary entry
const getRandomRoamer = () => {
    let roamerIndex = Math.floor(Math.random() * global.registeredRoamers.length)
    while (roamerIndex >= (global.registeredRoamers.length)) { // there is a hypothetical edge case where the maximum possible is generated and then indexes out of bounds, this loop hypothetically prevents that hypothetical edge case
        roamerIndex = Math.floor(Math.random() * global.registeredRoamers.length) // very hypothetical i know
    }

    console.log(roamerIndex)
    return global.roamingConditionalEncounters[global.registeredRoamers[roamerIndex]] // indexing a map numerically to index a map by object is 100% stupid but i love it
}

//get a random Roaming Legendary entry from a provided list
// used for rerolling legendary spawns from groups you have members of into members you don't have
/**
* @param {string[]} roamers 
* @returns {Map<string, string | function>}
*/
const getRoamerFromList = (roamers) => {
    let roamerIndex = Math.floor(Math.random * roamers.length)
    while (roamerIndex >= (roamers.length)) {
        roamerIndex = Math.floor(Math.random() * roamers.length)
    }

    console.log(roamerIndex)
    return global.roamingConditionalEncounters[roamers[roamerIndex]]
}


//function to test if a player meets the Encounter Condition for the specified Encounter entry
/**
* @param {PlayerJS} player 
* @param {string} species 
* @returns {boolean}
*/
const testEncounterCondition = (player, species, encounterType) => {
    let table = encounterType == 'roamer' ? global.roamingConditionalEncounters : global.staticConditionalEncounters
    let condition = table[species].condition(player)
    return condition
}

ServerEvents.commandRegistry(event => {
    const {commands: Commands, arguments: Arguments, builtinSuggestions: Suggestions} = event

    //Command to test a Conditional Encounter's Condition
    // '/testencountercondition <species> [<player>]'
    // ex: '/testencountercondition mew Emmerdog' tells you if player Emmerdog meets the encounter condition for Mew
    event.register(
        Commands.literal('testencountercondition')
            .requires(source => source.hasPermission(2))
            .then(Commands.argument('encounterType', Arguments.WORD.create(event))
                .suggests(builder => {
                    builder.suggest('roamer')
                    builder.suggest('static')
                    return builder.buildFuture()
                })
                .then(Commands.argument('species', Arguments.WORD.create(event))
                    .suggests(builder => builder.suggest(global.registeredRoamers))
                    .executes(ctx => {
                        let encounterType = Arguments.WORD.getResult(ctx, 'encounterType')
                        let species = Arguments.WORD.getResult(ctx, 'species')
                        let player = ctx.source.player
                        let condition = testEncounterCondition(player, species, encounterType)
                        player.tell(`${player.username} meets condition for ${encounterType} ${species}: ${condition}`)
                        return condition ? 1 : 0
                    })
                    .then(Commands.argument('player', Arguments.PLAYER.create(event))
                        .executes(ctx => {
                            let encounterType = Arguments.WORD.getResult(ctx, 'encounterType')
                            let species = Arguments.WORD.getResult(ctx, 'species')
                            let player = Arguments.PLAYER.getResult(ctx, 'player')
                            let condition = testEncounterCondition(player, species, encounterType)
                            if(ctx.source.player)
                                ctx.source.player.tell(`${player.username} meets condition for ${encounterType} ${species}: ${condition}`)
                            return condition ? 1 : 0
                        })
                    )
                )
            )
    )

    //Command to reset the Daily Roamer limiter flag immediately
    // '/resetdailyroamercounter [<player>]'
    // ex: '/resetdailyroamercounter Emmerdog' resets the flag for player Emmerdog
    event.register(
        Commands.literal('resetdailyroamercounter')
            .requires(source => source.hasPermission(2))
            .executes(ctx => {
                let player = ctx.source.player
                player.persistentData.dailyRoamerSuccesses = 0
                player.tell(`Daily roamer flag reset for ${player.username}`)
                return 1
            })
            .then(Commands.argument('player', Arguments.PLAYER.create(event))
                .executes(ctx => {
                    let player = Arguments.PLAYER.getResult(ctx, 'player')
                    player.persistentData.dailyRoamerSuccesses = 0
                    player.tell(`Daily roamer flag reset for ${player.username}`)
                    return 1
                })
            )
    )
})


//Legendary Tables

//Storage for Roaming Encounter data
//may randomly spawn around the player when specific conditions are met
global.roamingConditionalEncounters = {}

//a list of registered Roaming legendary pokemon, because you can't numerically index maps in JS
global.registeredRoamers = []


//Storage for Static Encounter data
//may be summoned in special locations (custom structures) when specific conditions are met
global.staticConditionalEncounters = {}


//Storage for Patchouli Multiblock objects
//so that we don't have to remake the multiblock object every time we want to use it
global.customMultiblocks = {}