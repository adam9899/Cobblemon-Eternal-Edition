ServerEvents.recipes(event => {
  event.remove({id: 'backpacked:backpack'})
  event.shaped('backpacked:backpack', [
    'RRR',
    'PZP',
    'RRR'
  ], {
	P: 'cobblemon:yellow_apricorn',
	Z: 'minecraft:copper_ingot',
	R: 'minecraft:rabbit_hide'
  }).id('cobblemoneternal:backpacked/backpack')
})