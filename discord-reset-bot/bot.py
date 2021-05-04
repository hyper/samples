'''Discord bot to reset license metadata'''
import os

from discord.ext import commands
from dotenv import load_dotenv
from hyper import get_license, update_license

load_dotenv()

HYPER_API_KEY = os.environ.get('HYPER_PUBLIC_KEY')
DISCORD_BOT_TOKEN = os.environ.get('DISCORD_BOT_TOKEN')
DISCORD_BOT_PREFIX = os.environ.get('DISCORD_BOT_PREFIX')

bot = commands.Bot(command_prefix=DISCORD_BOT_PREFIX)
bot.remove_command('help')

@bot.event
async def on_ready():
    '''Log to console once bot is ready'''
    print(f'Bot is running as {bot.user}')

@bot.command(name='reset')
async def reset_metadata(ctx, key):
    '''Simplistic version of the built-in Hyper reset command'''
    license_data = await get_license(HYPER_API_KEY, key)
    if license_data:
        license_owner = license_data['user'].get('discord', {}).get('id') if license_data['user'] is not None else None
        if license_owner == str(ctx.author.id):
            await update_license(HYPER_API_KEY, key, {'metadata': None})
            await ctx.send('Done!')
        else:
            await ctx.send('You are not the owner of this license.')
    else:
        await ctx.send('License not found.')

bot.run(DISCORD_BOT_TOKEN, bot=True, reconnect=True)
