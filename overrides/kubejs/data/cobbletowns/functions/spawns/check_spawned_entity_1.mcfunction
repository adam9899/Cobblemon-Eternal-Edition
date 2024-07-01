data modify storage cobbletowns:storage Storage.Copy set from entity @s data.last_spawned_uuid

# the uuid is compared in /data storage to check if there 
scoreboard players set $not_uuid pokemon_respawn_cooldown 1
execute as @e[type=cobblemon:pokemon,distance=..64] run function cobbletowns:spawns/check_spawned_entity_2
execute if score $not_uuid pokemon_respawn_cooldown matches 0 store result score @s pokemon_respawn_cooldown run data get entity @s data.last_spawned_check_cooldown_length