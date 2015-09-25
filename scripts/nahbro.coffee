# Description
#   A hubot script for miscellaneous Slack utilities.
#
# Configuration:
#   HUBOT_SLACK_TOKEN
#   HUBOT_BOT_NAME
#
# Commands:
#   slack delete last [<count>] - <Delete the last (N) Hubot posts in the current room or group>
#
# Author:
#   brianantonelli <brian.antonelli@autotrader.com>

request = require('request')
token = process.env.HUBOT_SLACK_TOKEN
botname = process.env.HUBOT_BOT_NAME
baseURL = 'https://slack.com/api'


replaceAll = (find, replace, str) ->
  return str.replace(new RegExp(find, 'g'), replace)


module.exports = (robot) ->

  robot.respond /naw bro/i, (msg) ->
    msg.send("My b dawg")
    msg.send(token)
    msg.send(botname)


