# note: this function now runs as the villager instead of the player.
kill @s
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{gastly18:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon gastly level=18
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{gastly21:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon gastly level=21
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{gastly22:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon gastly level=22
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{haunter25:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon haunter level=25
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{cubone20:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon cubone level=20
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{cubone22:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon cubone level=22
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{zubat17:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon zubat level=17
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{zubat20:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon zubat level=20
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{zubat22:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon zubat level=22
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{golbat23:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon golbat level=23
# note: cobbletowns:spawns/delete function replaced with command below because I've added an extra tag fpr every pearl so you don't have to make a delete command for every ender pearl anymore
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{pokemon_spawn_pearl:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..22] run kill @s