# marker entity spawns on a cooldown, and only if the last spawned entity is not in range
execute as @e[type=marker,tag=tower] at @s unless score @s pokemon_respawn_cooldown matches 1.. if data entity @s data.last_spawned_uuid if entity @p[distance=..19] run function cobbletowns:spawns/check_spawned_entity_1
execute as @e[type=marker,tag=house] at @s unless score @s pokemon_respawn_cooldown matches 1.. if data entity @s data.last_spawned_uuid if entity @p[distance=..19] run function cobbletowns:spawns/check_spawned_entity_1
execute as @e[type=marker,tag=tower] at @s unless score @s pokemon_respawn_cooldown matches 1.. if entity @p[distance=..19] run function cobbletowns:spawns/marker_tower
execute as @e[type=marker,tag=house] at @s unless score @s pokemon_respawn_cooldown matches 1.. if entity @p[distance=..19] run function cobbletowns:spawns/marker_house
# cooldown update
scoreboard players remove @e[type=marker,tag=tower,scores={pokemon_respawn_cooldown=1..}] pokemon_respawn_cooldown 1
scoreboard players remove @e[type=marker,tag=house,scores={pokemon_respawn_cooldown=1..}] pokemon_respawn_cooldown 1
execute as @e[type=marker,tag=tower2] at @s if entity @p[distance=..8] run spawnpokemon marowak level=30
execute as @e[type=marker,tag=tower2] at @s if entity @p[distance=..8] run kill @e[type=marker,tag=tower2]
execute at @e[type=minecraft:marker,tag=smoke] run particle minecraft:campfire_cosy_smoke ~ ~ ~ 0.1 0.8 0.1 0.05 0 force

# example command
# tower pokemon spawner
# - cooldown_length (in ticks, 1/20th of a second) = cooldown
# - last_spawned_check_cooldown_length (in ticks, 1/20th of a second) = time between each check for the last spawned entity
# /summon minecraft:marker ~ ~ ~ {Tags:["tower"],data:{cooldown_length:800,last_spawned_check_cooldown_length:400}}
