ServerEvents.recipes(event => {

    //Bottle Cap stat spec
    event.shapeless('cobblemoneternal:bottle_cap/hp', 
        ['cobblemoneternal:bottle_cap', 'cobblemon:white_mint_leaf', 'cobblemon:white_mint_leaf', 'cobblemon:white_mint_leaf', 'cobblemon:white_mint_leaf']
    ).id('cobblemoneternal:bottle_cap/hp')

    event.shapeless('cobblemoneternal:bottle_cap/atk', 
        ['cobblemoneternal:bottle_cap', 'cobblemon:red_mint_leaf', 'cobblemon:red_mint_leaf', 'cobblemon:red_mint_leaf', 'cobblemon:red_mint_leaf']
    ).id('cobblemoneternal:bottle_cap/atk')

    event.shapeless('cobblemoneternal:bottle_cap/def', 
        ['cobblemoneternal:bottle_cap', 'cobblemon:blue_mint_leaf', 'cobblemon:blue_mint_leaf', 'cobblemon:blue_mint_leaf', 'cobblemon:blue_mint_leaf']
    ).id('cobblemoneternal:bottle_cap/def')

    event.shapeless('cobblemoneternal:bottle_cap/spa', 
        ['cobblemoneternal:bottle_cap', 'cobblemon:cyan_mint_leaf', 'cobblemon:cyan_mint_leaf', 'cobblemon:cyan_mint_leaf', 'cobblemon:cyan_mint_leaf']
    ).id('cobblemoneternal:bottle_cap/spa')
    
    event.shapeless('cobblemoneternal:bottle_cap/spd', 
        ['cobblemoneternal:bottle_cap', 'cobblemon:pink_mint_leaf', 'cobblemon:pink_mint_leaf', 'cobblemon:pink_mint_leaf', 'cobblemon:pink_mint_leaf']
    ).id('cobblemoneternal:bottle_cap/spd')

    event.shapeless('cobblemoneternal:bottle_cap/spe', 
        ['cobblemoneternal:bottle_cap', 'cobblemon:green_mint_leaf', 'cobblemon:green_mint_leaf', 'cobblemon:green_mint_leaf', 'cobblemon:green_mint_leaf']
    ).id('cobblemoneternal:bottle_cap/spe')


    //Potential Limiter
    event.shaped('cobblemoneternal:potential_limiter', [
        'IWI',
        'NCN',
        'IBI'
    ], {
        'C': 'minecraft:comparator',
        'B': 'cobblemoneternal:bottle_cap',
        'N': 'minecraft:netherite_scrap',
        'I': 'minecraft:iron_ingot',
        'W': 'cobblemon:wide_lens'
    }).id('cobblemoneternal:potential_limiter')
})