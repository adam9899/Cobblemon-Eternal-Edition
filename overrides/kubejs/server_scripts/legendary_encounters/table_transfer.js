//priority: -1


//Transcribe entries in roamingConditionalEncounters into registeredRoamers
// so you don't have to do it manually
Object.keys(global.roamingConditionalEncounters).forEach((species) => {
    global.registeredRoamers.push(species)
});


//log registered roamers
global.registeredRoamers.forEach(species => {
    console.log(species)
})