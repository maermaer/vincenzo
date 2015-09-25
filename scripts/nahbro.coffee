token = process.env.HUBOT_SLACK_TOKEN
botname = process.env.HUBOT_BOT_NAME
baseURL = 'https://slack.com/api'

replaceAll = (find, replace, str) ->
  return str.replace(new RegExp(find, 'g'), replace)

module.exports = (robot) ->

  robot.respond /naw bro/i, (msg) ->
    msg.send("My b dawg")
    channel = msg.message.rawMessage.channel
    deleteMessage  channel, msg.ts

deleteMessage = (channel, ts) ->
  request.post {url: "#{baseURL}/chat.delete?token=#{token}&channel=#{channel}&ts=#{ts}", json: true}, (err, res, deleted) ->
    throw err if err
    console.log deleted