//priority: 10

const $CobblemonAPI = Java.loadClass('com.cobblemon.mod.common.Cobblemon').INSTANCE

const $CobblemonEntities = Java.loadClass('com.cobblemon.mod.common.CobblemonEntities')

const $PokemonEntity = Java.loadClass('com.cobblemon.mod.common.entity.pokemon.PokemonEntity')
const $Pokemon = Java.loadClass('com.cobblemon.mod.common.pokemon.Pokemon')
const $IVs = Java.loadClass('com.cobblemon.mod.common.pokemon.IVs')

const $PokemonSpecies = Java.loadClass('com.cobblemon.mod.common.api.pokemon.PokemonSpecies').INSTANCE
const $PokemonStats = Java.loadClass('com.cobblemon.mod.common.api.pokemon.stats.Stats')
const $Abilities = Java.loadClass('com.cobblemon.mod.common.api.abilities.Abilities')
const $Ability = Java.loadClass('com.cobblemon.mod.common.api.abilities.Ability')

const $Moves = Java.loadClass('com.cobblemon.mod.common.api.moves.Moves').INSTANCE

const $InteractionHand = Java.loadClass('net.minecraft.world.InteractionHand')


//Load encounter data on server startup
global.reloadEncounterData()


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
// here if we want to adjust the feel of that
const roamerRerollSuccessRate = 0.5

//length of a day
// here if we or a user wants to modify it (for if a day length extending mod is added)
// default: [24000]
const dayLength = 24000


//get the player's Party
/**
* @param {PlayerJS} player 
* @returns {Pokemon[]}
*/
const partyOf = (player) => {
    return $CobblemonAPI.getStorage().getParty(player)
}

//get a random Roaming Legendary entry (unweighted and without evaluating conditions)
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


//function to spawn a Pokemon
// used in Static and Roaming Encounter systems
const createPokemon = (speciesID, properties) => {
    let pokemon = new $Pokemon()
    let species = $PokemonSpecies.getByIdentifier(speciesID) //$PokemonSpecies.getByIdentifier(speciesID)
    //PokemonSpecies.getByIdentifier() does not exist in this version, so we use getByPokedexNumber() until we update

    pokemon.setSpecies(species)

    if(properties){
        if(properties.level)
            pokemon.setLevel(properties.level)
        if(properties.maxedIVs)
            $IVs.Companion.createRandomIVs(properties.maxedIVs).forEach(iv => {
                pokemon.setIV(iv.getKey(), iv.getValue())
            })
        if(properties.formAspects)
            pokemon.species.getForm(properties.formAspects)
        if(properties.heldItem)
            pokemon.swapHeldItem(properties.heldItem, false)
        if(properties.moveSet)
            for (let index = 0; index < properties.moveSet.length; index++){
                console.log(properties.moveSet[index], $Moves.getByName(properties.moveSet[index]).create())
                pokemon.moveSet.setMove(index, $Moves.getByName(properties.moveSet[index]).create())
            }
        if(properties.ability)
            pokemon.updateAbility(new $Ability($Abilities.INSTANCE.get(properties.ability), false))
    }

    console.log(pokemon)

    return pokemon
}


//function to test if a player meets the Encounter Condition for the specified Encounter entry
// used by the "testencountercondition" command exclusively
/**
* @param {PlayerJS} player 
* @param {string} species 
* @returns {boolean}
*/
const testEncounterCondition = (player, species, encounterType) => {
    let getTable = (species) => {
        let result
        switch (encounterType) {
            case 'roamer':
                result = global.roamingConditionalEncounters[species];
                break;

            case 'static':
                result = global.staticConditionalEncounters[species];
                break;

            default:
                player.tell(Text.translate('message.cobblemoneternal.command.test_condition.invalid_type').color('red'))
                break;
        }
        return result;
    }
    let encounterData = getTable(species)
    console.log(encounterData)
    if(!encounterData || encounterData.condition(player) == undefined)
        return false;

    return encounterData.condition(player)
}

ServerEvents.commandRegistry(event => {
    const {commands: Commands, arguments: Arguments, builtinSuggestions: Suggestions} = event

    //Command to test a Conditional Encounter's Condition
    // '/testencountercondition <species> [<player>]'
    // ex: '/testencountercondition mew Emmerdog' tells you if player Emmerdog meets the encounter condition for Mew
    event.register(
        Commands.literal('testencountercondition')
            .requires(source => source.hasPermission(2))
            .then(Commands.argument('encounterType', Arguments.STRING.create(event))
                //.suggests((ctx, builder) => Suggestions.suggests(builder, ["roamer", "static"]))
                .then(Commands.argument('species', Arguments.STRING.create(event))
                    //.suggests((ctx, builder) => Suggestions.suggest(builder, global.registeredRoamers))
                    .executes(ctx => {
                        let encounterType = Arguments.STRING.getResult(ctx, 'encounterType')
                        let species = Arguments.STRING.getResult(ctx, 'species')
                        let player = ctx.source.player
                        let condition = testEncounterCondition(player, species, encounterType)
                        player.tell(
                            Text.translate('message.cobblemoneternal.command.test_encounter_condition',
                                player.username, encounterType, species, condition)
                        )
                        player.tell(condition)
                        return condition ? 1 : 0
                    })
                    .then(Commands.argument('player', Arguments.PLAYER.create(event))
                        .executes(ctx => {
                            let encounterType = Arguments.STRING.getResult(ctx, 'encounterType')
                            let species = Arguments.STRING.getResult(ctx, 'species')
                            let player = Arguments.PLAYER.getResult(ctx, 'player')
                            let condition = testEncounterCondition(player, species, encounterType)
                            if(ctx.source.player)
                                ctx.source.player.tell(
                                    Text.translate('message.cobblemoneternal.command.test_encounter_condition',
                                        player.username, encounterType, species, condition)
                                )
                            player.tell(condition)
                            return condition ? 1 : 0
                        })
                    )
                )
            )
    )

    //Command to reset the Daily Roamer limit counter immediately
    // '/resetdailyroamercounter [<player>]'
    // ex: '/resetdailyroamercounter Emmerdog' resets the counter for player Emmerdog
    event.register(
        Commands.literal('resetdailyroamercounter')
            .requires(source => source.hasPermission(2))
            .executes(ctx => {
                let player = ctx.source.player
                player.persistentData.dailyRoamerSuccesses = 0

                player.tell(Text.translate('message.cobblemoneternal.command.reset_daily_roamer',
                    player.username))
                return 1
            })
            .then(Commands.argument('player', Arguments.PLAYER.create(event))
                .executes(ctx => {
                    let player = Arguments.PLAYER.getResult(ctx, 'player')
                    player.persistentData.dailyRoamerSuccesses = 0

                    player.tell(Text.translate('message.cobblemoneternal.command.reset_daily_roamer',
                        player.username))
                    return 1
                })
            )
    )

    event.register(
        Commands.literal('encounterreload')
            .requires(source => source.hasPermission(2))
            .executes(ctx => {
                global.reloadEncounterData()
                ctx.source.player.tell(Text.translate('message.cobblemoneternal.command.reload_conditional_encounters'))
                return 1
            })
            .then(Commands.argument('set', Arguments.STRING.create(event))
                .executes(ctx => {
                    let gen = Arguments.STRING.getResult(ctx, 'set')
                    global[`load${set}Encounters`]()
                    ctx.source.player.tell(Text.translate('message.cobblemoneternal.command.reload_conditional_encounters'))
                    return 1
                })
            )
    )
})