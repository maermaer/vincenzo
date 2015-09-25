token = process.env.HUBOT_SLACK_TOKEN;
botname = process.env.HUBOT_BOT_NAME;
baseURL = 'https://slack.com/api';

module.exports = function(robot) {
    robot.respond(/is it (weekend|holiday)\s?\?/i, function(msg){
        var today = new Date();

        msg.reply(today.getDay() === 0 || today.getDay() === 6 ? "YES" : "NO");
    });
}

//deleteMessage = (robot, channel, ts) ->
//  robot.http("#{baseURL}/chat.delete?token=#{token}&channel=#{channel}&ts=#{ts}")
//    .get() (err, res, body) ->
//      throw err if err
//      msg.send(res)
//      msg.send(body)
//
//getHistory = (robot, channel, cb) ->
//  if (channel.substr(0,1) == "G")
//    robot.http("#{baseURL}/groups.history?token=#{token}&channel=#{channel}&count=15").get() (err, res, history) ->
//      throw err if err
//      cb history
//  else
//    robot.http("#{baseURL}/channels.history?token=#{token}&channel=#{channel}&count=15").get() (err, res, history) ->
//      throw err if err
//      cb history
//
//module.exports = (robot) ->
//  robot.respond /naw bro/i, (msg) ->
//    msg.send("My b dawg")
//    count = 1
//    channel = msg.message.rawMessage.channel
//
//    userid = -1
//    robot.http("#{baseURL}/users.list?token=#{token}").get() (err, res, users) ->
//      throw err if err
//      userid = (user for user in users.members when user.name is username)[0]
//      cb userid.id
//
//    getHistory robot, channel, (history) ->
//      messages = (message for message in history.messages when message.user is hubotid)
//      messages = messages.slice 0, count
//      for msg, i in messages
//        deleteMessage  robot, channel, msg.ts
//