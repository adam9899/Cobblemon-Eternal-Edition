gamerule commandBlockOutput false

# for the marker entities
scoreboard objectives add pokemon_respawn_cooldown dummy
scoreboard players set $not_uuid pokemon_respawn_cooldown 0
#define storage cobbletowns:storage
execute unless data storage cobbletowns:storage Storage run data merge storage cobbletowns:storage {Storage:{Copy:[],Compare:[]}}