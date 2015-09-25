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
  del_url = "#{baseURL}/chat.delete?token=#{token}&channel=#{channel}&ts=#{ts}"
  robot.http(del_url)
    .header("Content-Type", "application/x-www-form-urlencoded")
    .post() (err, res, body) ->
      throw err if err
      console.log deleted
