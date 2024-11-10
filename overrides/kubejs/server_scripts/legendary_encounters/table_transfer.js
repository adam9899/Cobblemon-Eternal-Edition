//priority: -1


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