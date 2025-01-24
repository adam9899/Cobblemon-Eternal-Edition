ServerEvents.tags('item', event => {

    event.add('cobblemoneternal:backpacks', /sophisticatedbackpacks:.*backpack/)

    event.add('cobblemoneternal:pokefinder', /cobblenav:pokefinder_item_.*/)



    event.add('cobblemoneternal:unfinished', [
        /cobblemoneternal:.*_core/,
        'cobblemoneternal:zygarde_cube',
        'cobblemoneternal:mewtant_genome'
    ])

})