replaceAll = (find, replace, str) ->
  return str.replace(new RegExp(find, 'g'), replace)

module.exports = (robot) ->
  active = false
  topic = "nothing"
  unresolved_bet = false
  bets = {}

  robot.respond /i have a gambling problem/i, (msg) ->
    msg.send("Available commands:")
    msg.send("What are the bets?")
    msg.send("What are we betting on?")
    msg.send("Open bets on <topic>")
    msg.send("Bet/Put <amount> on <item>")
    msg.send("Close it up")
    msg.send("Resolve with <winning_bet>")

  robot.respond /close it up/i, (msg) ->
    if active == true
      active = false
      msg.send("Betting closed.")
    else
      msg.send("There isn't an active bet.")

  robot.respond /open bets on (.*)/i, (msg) ->
    if active == false and unresolved_bet == false
      active = true
      unresolved_bet = true
      topic = msg.match[1]
      msg.send("Betting has begun on " + msg.match[1])
    else
      msg.send("A bet is already active or unresolved");

  robot.respond /what are we betting on/i, (msg) ->
    if active == true or unresolved_bet == true
      msg.send("We're betting on " + topic)
    else
      msg.send("We're not betting right now")

  robot.respond /(bet|put) (.*) on (.*)/i, (msg) ->
    if(active == true)
      user = msg.message.user || "The house"
      if user != "The house"
        name = msg.message.user.name.toLowerCase()
      else
        name = user
      bets[name] = " with " + msg.match[2] + " on " + msg.match[3]
      msg.send("You've put " + msg.match[2] + " on " + msg.match[3] + ".")
    else
      msg.send("We're not betting right now.")

  robot.respond /what are the bets/i, (msg) ->
    prettyText = replaceAll(":", "", JSON.stringify(bets))
    prettyText = replaceAll("{", '', prettyText)
    prettyText = replaceAll("}", "", prettyText)
    prettyText = replaceAll('"', "", prettyText)
    if prettyText.trim() != ""
      msg.send(prettyText)
    else
      msg.send("There aren't any.")

  robot.respond /resolve with (.*)/i, (msg) ->
    if unresolved_bet == true
      active = false
      unresolved_bet = false
      topic = "nothing"
      msg.send(msg.match[1] + " wins!")
      prettyText = replaceAll(":", "", JSON.stringify(bets))
      prettyText = replaceAll("{", '', prettyText)
      prettyText = replaceAll("}", "", prettyText)
      prettyText = replaceAll('"', "", prettyText)
      if prettyText.trim() != ""
        msg.send("The bets were: ")
        msg.send(prettyText)
      else
        msg.send("There aren't any.")
      bets = {}
    else
      msg.send("There isn't an unresolved bet going on.")

