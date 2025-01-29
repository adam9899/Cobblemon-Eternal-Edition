//priority: 8

//const $CobblemonAPI = Java.loadClass('com.cobblemon.mod.common.Cobblemon').INSTANCE

const $CobblemonEvents = Java.loadClass('com.cobblemon.mod.common.api.events.CobblemonEvents')
const $Priority = Java.loadClass('com.cobblemon.mod.common.api.Priority')

const $PokemonProperties = Java.loadClass('com.cobblemon.mod.common.api.pokemon.PokemonProperties')
const $BenchedMove = Java.loadClass('com.cobblemon.mod.common.api.moves.BenchedMove')
const $Moves = Java.loadClass('com.cobblemon.mod.common.api.moves.Moves').INSTANCE

StartupEvents.postInit(event => {
    $CobblemonEvents.POKEMON_NICKNAMED.subscribe($Priority.NORMAL, event => {
        global.handleNicknameEasterEggs(event)
    })
})


global.handleNicknameEasterEggs = (event) => {
    //console.log(`nickname event fired!!! name: ${event.nickname}`, event.nicknameString)
    if(event.nicknameString) {
    let {nicknameString: nicknameString, player: player, pokemon: pokemon} = event
    //let nicknameString = event.nicknameString
    /*
    console.log(
        nicknameString,
        global.nicknameEasterEggs[nicknameString.toLowerCase()],
        nicknameString.toLowerCase() == 'garstomp'
    )
    */

    if(global.nicknameEasterEggs[nicknameString.toLowerCase()])
        global.nicknameEasterEggs[nicknameString.toLowerCase()](pokemon, player, nicknameString)
    }
}


global.nicknameEasterEggs = {
    'emperdog': (pokemon, player, nickname) => {
        //console.log(`evaluating nickname 'emperdog' for ${pokemon.species.resourceIdentifier}`)
        if(pokemon.level >= 80
            && pokemon.species.resourceIdentifier == 'cobblemon:snom')
            global.eternalForm(pokemon, player, nickname)
    },
    'garstomp': (pokemon, player, nickname) => {
        //console.log(`evaluating nickname 'garstomp' for ${pokemon.species.resourceIdentifier}`)
        if(pokemon.species.resourceIdentifier == 'cobblemon:garchomp')
            addMove(pokemon, 'eternabeam', player, nickname)
    }
}


global.eternalForm = (pokemon, player, nickname) => {
    console.log(`Setting ${pokemon.species.resourceIdentifier} to Eternal form`)
    if(!pokemon.form.aspects.contains("eternal")) {
        $PokemonProperties.Companion.parse("eternal=true").apply(pokemon)
        player.tell(Text.translate('cobblemoneternal.pokemon.form_change_eternal', nickname).color('light_purple'))
        global.playSoundNear(player, null, 'minecraft:entity.ender_dragon.ambient', 'neutral', 0.5, 1.0)
    }
}

const addMove = (pokemon, move, player, nickname) => {
    console.log(`Adding special move '${move}' to ${pokemon.species.resourceIdentifier}`)
    let knows = false
    //.stream().anyMatch(move => move.moveTemplate.name == 'eternabeam')
    pokemon.benchedMoves.forEach(benchedMove => {
        if(benchedMove.moveTemplate.name == move)
            knows = true
    })
    if(!knows) {
        pokemon.benchedMoves.add(new $BenchedMove($Moves.getByName(move).create().template, 0))
        player.tell(Text.translate("cobblemon.experience.learned_move", nickname, Text.translate(`cobblemon.move.${move}`)))
    }
}