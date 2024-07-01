execute if score $not_uuid pokemon_respawn_cooldown matches 1 run data modify storage cobbletowns:storage Storage.Compare set from storage cobbletowns:storage Storage.Copy
execute if score $not_uuid pokemon_respawn_cooldown matches 1 store success score $not_uuid pokemon_respawn_cooldown run data modify storage cobbletowns:storage Storage.Compare set from entity @s UUID
