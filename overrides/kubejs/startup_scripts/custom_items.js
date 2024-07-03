//priority: 5


//Array of simple items
const simpleItems = [

]


//Array of simple blocks
const simpleBlocks = [
    'cloning_machine_core'
]


StartupEvents.registry('item', event => {
    simpleItems.forEach(item => {
        event.create(`cobblemoneternal:${item}`)
    })
})


StartupEvents.registry('block', event => {
    simpleBlocks.forEach(block => {
        event.create(`cobblemoneternal:${block}`)
    })
})