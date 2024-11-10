//priority: 5

const $PokemonStats = Java.loadClass('com.cobblemon.mod.common.api.pokemon.stats.Stats')


//Array of simple items
const simpleItems = [
    'zygarde_cube', // complex code is implemented in an Entity Interaction event, along with other manual form changes
    'bottle_cap/normal',
    'potential_limiter'
]


//Array of simple blocks
const simpleBlocks = [
    
]

//Blocks for Static Conditional Encounters
// if you want to make it more complex, you can manually define it.
const staticSpawnerBlocks = {
    'cloning_machine_core': {
        soundType: 'metal',
        hardness: 1.5
    }
}


StartupEvents.registry('item', event => {
    simpleItems.forEach(item => {
        event.create(`cobblemoneternal:${item}`)
    })

    $PokemonStats.Companion.PERMANENT.forEach(stat => {
        event.create(`cobblemoneternal:bottle_cap/${stat.showdownId}`)
            .texture('cobblemoneternal:item/bottle_cap/normal')
            .tag('cobblemoneternal:iv_stat_up')
    })

    event.create(`cobblemoneternal:bottle_cap/gold`)
        .tag('cobblemoneternal:iv_stat_up')
})


StartupEvents.registry('block', event => {
    simpleBlocks.forEach(block => {
        event.create(`cobblemoneternal:${block}`)
    })

    Object.keys(staticSpawnerBlocks).forEach(block => {
        let properties = staticSpawnerBlocks[block]
        event.create(`cobblemoneternal:${block}`, 'cardinal')
            .soundType(properties.soundType)
            .hardness(properties.hardness ? properties.hardness : 50.0)
            .tagBlock('cobblemoneternal:static_spawner_block')
            .placementState(ctx => {
                BlockProperties.FACING, ctx.getClickedFace().getAxis()
            })
    })
})