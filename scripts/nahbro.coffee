# Description:
#   A simple 'naw dawg' for hubot to cleanup after himself
#   https://api.slack.com/methods/channels.history/
#   https://api.slack.com/methods/chat.delete/
#
# Configuration:
#   HUBOT_SLACK_TOKEN
#
# Commands:
#   hubot naw dawg
#   
# Dependencies:
#   lodash
#
# Examples:
#   hubot naw dawg
#
# Authors:
#   Matt Shwery (mshwery)
#   Chris Roberts
#   

_ = require('./lodash')

baseUrl = 'https://slack.com/api'
token = process.env.HUBOT_SLACK_TOKEN
historyLimit = 5
responses = {
  error: "I'm sorry, Dave. I'm afraid I can't do that.",
  success: "My b dawg"
}

module.exports = (robot) ->
  hubotName = robot.name
  channels = []
  groups = []

  robot.respond /(naw|no|nein|negative|iie|nah|neh|your b) (friend|dawg|breh|bro|bruh|dog|ghost rider|bien|good|tomodachi|man)$/i, (msg) ->
    channelName = msg.message.room
    botUser = robot.brain.userForName(hubotName)

    deleteMessage = (message, channel) ->
      url = "#{baseUrl}/chat.delete?token=#{token}&channel=#{channel.id}&ts=#{message.ts}"
      msg.robot.http(url).get() (err, res, body) ->
        data = JSON.parse(body)
        if (data.ok)
          msg.send responses.success
        else
          msg.send responses.error

    fetchChannelHistory = () ->
      channel = _.find(channels, { name: channelName })
      group_or_im_id = msg.envelope.message.rawMessage.channel

      api_subgroup = null
      if (channel)
        api_subgroup = "channels"
      else if (group_or_im_id)
        is_group = _.find(groups, { id: group_or_im_id })
        channel = { "id": group_or_im_id }
        if (is_group)
          api_subgroup = "groups"
        else
          api_subgroup = "im"

      # now that we may have a channel
      # we can use its id to get that channel's history
      if (channel)
        url = "#{baseUrl}/#{api_subgroup}.history?token=#{token}&channel=#{channel.id}&count=#{historyLimit}"
        msg.robot.http(url).get() (err, res, body) ->
          data = JSON.parse(body)
          lastBotMessage = _.find(data.messages, { user: botUser.id })

          # if we have a message from this bot,
          # lets delete it!
          if lastBotMessage and !_.includes(responses, lastBotMessage.text)
            deleteMessage(lastBotMessage, channel)
          else
            msg.send responses.error
      else
        msg.send "/shrug Sorry, I couldn't find this channel correctly"


    if !botUser
      console.warn "Couldn't find a user for #{hubotName}"

    if !groups.length
      # get a list of groups
      msg.robot.http("#{baseUrl}/groups.list?token=#{token}&exclude_archived=1").get() (err, res, body) ->
        data = JSON.parse(body)
        groups = data.groups

    if !channels.length
      # get a list of channels (unfortunately the only way to get channel IDs for the next api call)
      msg.robot.http("#{baseUrl}/channels.list?token=#{token}&exclude_archived=1").get() (err, res, body) ->
        data = JSON.parse(body)
        channels = data.channels
        fetchChannelHistory()
    else
      fetchChannelHistory()
