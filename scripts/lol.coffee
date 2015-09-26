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
    "The merest shade of me... is enough to defeat you!"
  ],
  lollerblades: [
    "Chris lieks da bois",
    "Chris lubs da bois",
    "Chris especially hot for da lady bois"
  ],
  ashehole: [
    "I can definitely fit this many dicks in my mouth -Ashton",
    "One butt plug or two? -Ashton",
    "Nah bro suckin' dicks ain't gay -Ashton",
    "Calm down or I'm gonna find you and suck yo dick -Ashton"
  ],
  mustang: [
    "The power of one man doesn't amount to much. But, with whatever little strength I'm capable of... I'll do everything humanly possible to protect the people I love, and in turn they'll protect the ones they love. It seems like the least we tiny humans can do for each other.",
    "When I, who am called a 'weapon' or a 'monster', fight a real monster, I can fully realize I'm just a human.",
    "Can you really hold the woman you love, with your blood stained hands?",
    "This is hard, he's such a small target",
    "That's a stupid question, Havoc. I say it because it's true. And when I'm Führer, there will be changes. That day, all female officers will be required to wear...TINY MINISKIRTS!",
    "Dogs huh...I LOVE DOGS! But of course! Dogs embody loyalty, they follow their masters commands above all else! Be a jerk to them and they don't complain, and they never once beg for a paycheck! Trust me Fuery! They're the great servants of man! *sings* Boy oh canine, how we salute thee!",
    "I don't know how long you've lived fuhrer, or how many times you've cheated death, but not anymore.",
    "It's much harder dealing with the living. Give me a ghost to talk to any day.",
    "It's the end of the line.",
    "What are you doing to my dear subordinate? Don't do anything rash, Lieutenant. I told you I was going to take care of them.,
    "Men should be able to handle both their job and their women,I do.",
    "Let's test their luck.",
    "Take it or GO HOME!",
    "Way to bring your trouble home with you, Fullmetal, really nice.",
    "Nothing's perfect, the world's not perfect, but it's there for us, trying the best it can. That's what makes it so damn beautiful.",
    "(to Hawkeye at Hughes' funeral) Except... it's a terrible day for rain. Hawkeye: But, what do you mean? It's not raining. Mustang: Yes... it is. (as a single tear rolls down his cheek)",
    "I didn't do this for politics! I couldn't forgive myself for being blind this long. This is the only way I could atone for the friends I didn't saved!",
    "Foolish enough to let you prosper on their suffering.",
    "But you're thinking on too large a scale there, kid...if we don't want to drive ourselves crazy..we can only deal with what's directly in front of us.",
    "I knew they wouldn't let themselves get caught without a reason. Those boys are smarter than that.",
    "You know running makes you look guilty.",
    "(to Hawkeye) You were giving me a look that said 'perform human transmutation and I'll shoot you.",
    "(to Havoc) No... you can't die... not before I do.",
    "If you believe the possibility exists, then you should do whatever it takes",
    "Hmm. There really is nothing quite like watching fools dig their own graves. Especially, when that fool is an arrogant homunculus who's too stupid to see what he's doing. I've humored you long enough. So how about you answer a question of mine? I want you to tell me who killed Maes Hughes. And I want the truth, Homunculus.",
    "Quit running your mouth, you idiot! I'm sick of you homunculi giving me the runaround when I ask you this question. Tell me the truth or I'll burn it out of you! You worthless scum! Tell me who's responsible for his murder.",
    "You're saying you killed Hughes? I doubt a moron like you could pull that off.",
    "It's Kind of interesting how quickly the tongue can be rendered to a bubbling grease. It's surprising how easy it burns, isn't it?",
    "What's it like having the fluids inside of your eyes boil? I'd imagine it might sting a little.",
    "I'm surprised you'd intentionally make my target bigger for me. Did you think being bigger would let you beat me? Idiot! Get up, monster! Hurry and regenerate yourself. I'm going to let you relive that pain over and over until you die.",
    "Maes Hughes is dead. That's fact. And you to invoke his image, you must be a glutton for punishment!",
    "You fool. Did you think I wouldn't use heavy firepower right next to me? Don't you know I can do pinpoint aiming? Too bad for you, BECAUSE I CAN!!!"
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
