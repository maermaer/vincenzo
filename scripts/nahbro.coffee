token = process.env.HUBOT_SLACK_TOKEN
botname = process.env.HUBOT_BOT_NAME
baseURL = 'https://slack.com/api'

replaceAll = (find, replace, str) ->
  return str.replace(new RegExp(find, 'g'), replace)

module.exports = (robot) ->
  robot.respond /naw bro/i, (msg) ->
    msg.send("My b dawg")
    channel = msg.message.rawMessage.channel
    msg.send(channel)
    msg.send(String(msg.ts))
    msg.send("ok")
    deleteMessage robot, channel, msg.ts

deleteMessage = (robot, channel, ts) ->
  robot.http("#{baseURL}/chat.delete?token=#{token}&channel=#{channel}&ts=#{ts}")
    .get() (err, res, body) ->
      throw err if err
      msg.send(res)
      msg.send(body)

getHistory = (robot, channel, cb) ->
  if (channel.substr(0,1) == "G")
    robot.http("#{baseURL}/groups.history?token=#{token}&channel=#{channel}&count=15").get() (err, res, history) ->
      throw err if err
      cb history
  else
    robot.http("#{baseURL}/channels.history?token=#{token}&channel=#{channel}&count=15").get() (err, res, history) ->
      throw err if err
      cb history

getUserId = (robot, username, cb) ->
   robot.http("#{baseURL}/users.list?token=#{token}").get() (err, res, users) ->
    throw err if err
    userid = (user for user in users.members when user.name is username)[0]
    cb userid.id

# Find Hubot's ID
hubotid = null
getUserId robot, botname, (uid) ->
  hubotid = uid

module.exports = (robot) ->
  robot.respond /slack delete last\s?(\d+)?/i, (msg) ->
    count = msg.match[1]
    if not count then count = 1
    channel = msg.message.rawMessage.channel

    getHistory robot, channel, (history) ->
      messages = (message for message in history.messages when message.user is hubotid)
      messages = messages.slice 0, count
      for msg, i in messages
        deleteMessage  robot, channel, msg.ts