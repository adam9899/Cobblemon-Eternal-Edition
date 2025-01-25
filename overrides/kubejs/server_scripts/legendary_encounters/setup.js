//priority: 4

//(re)Load encounter data on script (re)load
global.reloadEncounterData()

ServerEvents.loaded(event => {
    let seed = event.getServer().worldData.worldGenOptions().seed()
    if(seed < 0)
        seed *= -1.0
    console.log(seed)
    global.findRegiPuzzles(seed)
    Object.keys(global.regiPuzzleIndex).forEach(regi => console.log(`${regi} = ${global.regiPuzzleIndex[regi]}`))
})
