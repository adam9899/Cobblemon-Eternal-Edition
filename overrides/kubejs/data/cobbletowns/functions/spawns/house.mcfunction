# note: this function now runs as the villager instead of the player.
kill @s
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{raticate32:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon raticate level=32
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{raticate34:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon raticate level=34
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{litwick29:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon litwick level=29
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{litwick30:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon litwick level=30
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{litwick32:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon litwick level=32
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{lampent34:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon lampent level=34
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{sigilyph35:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon sigilyph level=35
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{yamask29:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon yamask level=29
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{yamask31:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon yamask level=31
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{elgyem30:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon elgyem level=30
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{elgyem34:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon elgyem level=34
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{golbat32:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon golbat level=32
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{golbat33:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..20] run spawnpokemon golbat level=33
# note: cobbletowns:spawns/delete function replaced with command below because I've added an extra tag fpr every pearl so you don't have to make a delete command for every ender pearl anymore
execute as @e[type=item,nbt={Item:{id:"minecraft:ender_pearl",tag:{pokemon_spawn_pearl:1b}}},limit=1,sort=nearest] at @s if entity @p[distance=..22] run kill @s