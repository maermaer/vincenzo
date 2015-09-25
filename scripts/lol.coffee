# Description:
#   Quotes from league of legends champions
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   // league quote {champion} {phrase}
#
# Author:
#   Charles

champions = {
  nasus: [
    "The cycle of life and death continues; we will live, they will die.",
    "There, for grace, I go.",
    "It is neverending.",
    "Their death, awaits.",
    "Do not try my patience.",
    "Between life and death lies immortality.",
    "Some things must remain buried.",
    "Eons... pass like days.",
    "The sky was naught but dying stars.",
    "For centuries, I have watched.",
    "Burdens sleep best in their tombs.",
    "No dawn comes without darkness.",
    "I walk through the ages.",
    "Errant words may fell empires.",
    "The past is a tapestry of what lies ahead.",
    "I bring death.",
    "Soon, there will be nothing.",
    "Life is part of a cycle. Yours is over.",
    "Your soul will be measured.",
    "Death is a harsh mistress.",
    "Your spirit is hollow.",
    "Journey into the beyond.",
    "Return to the dust.",
    "We approach a time of reckoning.",
    "This too must end.",
    "Some spirits are fated to burn.",
    "Eternity is beyond your reach.",
    "Your legacy shall drift away. Blown into eternity, like the sands of the desert",
    "There is such potential in one mortal life; you have wasted yours.",
    "We begin a new cycle!",
    "The wheel never stops turning."
  ],
  zed: [
    "The unseen blade is the deadliest.",
    "Without a sound.",
    "No technique is forbidden.",
    "Do not fear the shrouded path.",
    "Balance is a fool's master.",
    "Secrets kept are weapons wasted.",
    "The shadows have enlightened me.",
    "Balance is weakness.",
    "The truth lies in darkness.",
    "Tradition is the corpse of wisdom.",
    "What I have done... cannot be undone.",
    "Only the worthy will survive.",
    "I am the blade in the darkness.",
    "Cut the last breath from them.",
    "The shadow is within.",
    "Punish restraint.",
    "Do not deny me.",
    "They follow the wrong master.",
    "None escape their shadow.",
    "Ignorance is fatal.",
    "Embrace the shadow... or die in darkness!",
    "The merest shade of me... is enough to defeat you!",
    "Chris likes bois!"
  ],
  lollerblades: [
    "Chris lieks da bois",
    "Chris lubs da bois",
    "Chris especially hot for da lady bois"
  ]
}

pics = {
  nasus: "http://ddragon.leagueoflegends.com/cdn/4.21.5/img/champion/Nasus.png",
  zed: "http://ddragon.leagueoflegends.com/cdn/4.21.5/img/champion/Zed.png",
  lollerblades: "http://i2.kym-cdn.com/entries/icons/square/000/001/030/dickbutt.jpg"
}

module.exports = (robot) ->
  robot.respond /league\s+quote\s+[a-zA-Z]+\s*[a-zA-Z]*/i, (msg) ->
    command = msg.match[0]
    array = command.split(/\s/)
    champion = array[3]
    subject = array[4] if array.length == 5
    subject = '' if subject == null || subject == undefined
    filter = (q) -> q.toLowerCase().indexOf(subject) != -1
    quotes = champions[champion].filter(filter)
    msg.send pics[champion]
    msg.send msg.random quotes
