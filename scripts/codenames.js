board_size = 5;

var build_row = function(){
  var rand_words = new Array(board_size);
  for(var i=0; i<board_size;i++){
    var index = Math.floor(Math.random() * words.length);
    var word = words[index].toLowerCase();
    rand_words[i] = word;
  }
  return rand_words;
}

var build_board = function(){
  var board = new Array(5);
  for(var i=0; i<board_size; i++){
    board[i] = build_row();
  }
  return board;
}

var format_board = function(board){
  var tempStr = '```';
  for(var i=0; i<board_size;i++){
    tempStr += format_row(board[i]);
  };
  tempStr += '```';
  return tempStr;
}

var format_row = function(row){
  var spaced_row = [];

  for(var i=0;i<board_size;i++){
    var word = row[i];
    var spaces = "";
    var times = 15 - word.length;
    for(j=0;j<times;j++){
      spaces += " ";
    }
    var spaced_word = word + spaces;
    spaced_row.push(spaced_word);
  }
  return '   ' + spaced_row.join(" ") + '\n';
}

var build_key_board = function(){
  var keys = [];
  for(var i=0;i<board_size;i++){
    for(j=0;j<board_size;j++){
      keys.push({ x:i, y:j });
    }
  }
  return keys;
}

var shuffle = function(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

  return array;
}

var get_word_index = function(word, the_board){
  var word = word.toLowerCase();
  var location = { x: -1, y: -1};
  for(var i=0;i<board_size;i++){
    if(the_board[i].indexOf(word) != -1)
    {
      location.x = i;
      location.y = the_board[i].indexOf(word);
    }
  }
  return location;
}

var build_keys = function(red_team_first){
  var key_board = build_key_board();
  key_board = shuffle(key_board);

  var red_keys = [];
  var blue_keys = [];

  for(var i=0; i<8; i++){
    red_keys.push(key_board.pop());
    blue_keys.push(key_board.pop());
  }

  if(red_team_first)
  {
    red_keys.push(key_board.pop());
  }
  else
  {
    blue_keys.push(key_board.pop());
  }

  keys = { red_keys: red_keys, blue_keys: blue_keys, black_key: key_board.pop(), red_team_first: red_team_first };
  return keys;
}

var random_boolean = function(){
  return Math.random()<.5;
}

var get_team_keylist = function(keylist, the_board){
  team_list = [];
  keylist.forEach(function(loc) {
     team_list.push(the_board[loc.x][loc.y]);
  }, this);
  return team_list;
}

var format_keys = function(the_board, keys){
  var formatted_blue = get_team_keylist(keys.blue_keys, the_board).join(", ");
  var formatted_red = get_team_keylist(keys.red_keys, the_board).join(", ");

  formatted_blue = "Blue team's keys: " + formatted_blue;
  formatted_red = "Red team's keys: " + formatted_red;
  var formatted_black = "The black key is: " + the_board[keys.black_key.x][keys.black_key.y];

  var team_first = " goes first!";

  if(keys.red_team_first)
  {
    team_first = "Red" + team_first;
  }
  else
  {
     team_first = "Blue" + team_first;
  }

  return '```\n' + formatted_red + '\n' + formatted_blue + '\n' + formatted_black + '\n' + team_first + '```';
}

var is_on_team = function(username, team){
  return team.indexOf(username) != -1;
}

var is_ingame = function(username, teams){
  return is_on_team(username, teams.blue) || is_on_team(username, teams.red);
}

var mark_board = function(the_board,loc, color){
  the_board[loc.x][loc.y] = color;
}

var make_leader = function(user){
  var success = false;
  if(teams.blue.indexOf(user.username) != -1){
    teams.blue_captian = user;
  }
  else if(teams.red.indexOf(user.username) != -1)
  {
     teams.red_captain = user;
  }
  else
  {
    success = false;
  }

  return success;
}


module.exports = function(robot) {

  robot.respond(canned_requests[2], function(msg){
    // Basic game setup
    var teams = { blue: [], red: [], red_captain: null, blue_captian: null };
    var the_board = build_board();
    var marked_board = the_board;
    var red_team_first = random_boolean();
    var keys = build_keys(red_team_first);
    var game_running = false;
    msg.reply(canned_responses[2]);
  });

  robot.respond(canned_requests[3], function(msg){
    game_running = true;
    msg.reply(canned_responses[8]);
  });

  robot.respond(canned_requests[8], function(msg){
    msg.reply(format_board(the_board));
  });

  robot.respond(canned_requests[9], function(msg){
    msg.reply(format_board(marked_board));
  });

  robot.respond(canned_requests[0], function(msg){
    msg.reply(canned_responses[0]);
  });

  robot.respond(canned_requests[1], function(msg){
    if(make_leader(msg.message.user))
    {
      msg.reply(canned_responses[1]);
    }
    else
    {
      msg.reply(canned_errors[6]);
    }
  });

  robot.respond(canned_requests[6], function(msg){
    msg.reply(canned_responses[5] + "Blue: " + teams.blue.toString() + " Red: " + teams.red.toString());
  });

  robot.respond(canned_requests[7], function(msg){
    msg.reply(
      "```" + canned_requests.toString().replace(/\/i/g, "").replace(/\//g, "").replace(/\\s/g, "").replace(/\\/g, "").replace(/\?/g, "") + "```"
      );
  });

  // Choosing a word
  robot.respond(canned_requests[4], function(msg){

    var word = msg.match[1].toLowerCase();

    var loc = get_word_index(word, the_board);
    var key_loc = {};
    var username = msg.message.user.name;
    if(is_ingame(username, teams))
    {
      var user_team_keys = null;
      var enemy_team_keys = null;
      var blue_keys = get_team_keylist(keys.blue_keys, the_board);
      var red_keys = get_team_keylist(keys.red_keys, the_board);
      var black_key = the_board[keys.black_key.x][keys.black_key.y];
      var user_team = null;
      var enemy_team = null;

      // Assign the solution to the correct team
      if(is_on_team(username, teams.blue))
      {
        user_team_keys = blue_keys;
        enemy_team_keys = red_keys;
        user_team = "Blue";
        enemy_team = "Red";
      }
      else
      {
        user_team_keys = red_keys;
        enemy_team_keys = blue_keys;
        user_team_color = "Red";
        enemy_team_color = "Blue";
      }

      // If it's not a word
      if(loc.x == -1){
        msg.reply(canned_errors[5]);
      }
      else
      {
        // Respond differently based on result of check
        if(user_team_keys.indexOf(word) != -1)
        {
          msg.reply(feedback[0]);
          mark_board(the_board, loc, user_team_color);
        }
        else if(enemy_team_keys.indexOf(word) != -1)
        {
          msg.reply(feedback[2]);
          mark_board(the_board, loc, enemy_team_color);
        }
        else if(word == black_key)
        {
          msg.reply(feedback[3]);
          mark_board(the_board, loc, "Black");
        }
        else
        {
          msg.reply(feedback[1]);
        }
      }
    }
    else
    {
      msg.reply(canned_errors[6]);
    }
  });

  robot.respond(canned_requests[9], function(msg){
    user = msg.message.user;
    if(user == teams.red_captain || user == teams.blue_captian)
    {
      msg.reply(format_keys(the_board, keys)); // @TODO change this to whisper
    }
    else
    {
      msg.reply(canned_errors[8]);
    }
  });

  robot.respond(canned_requests[10], function(msg){
    var new_team = msg.match[1];
    var username = msg.message.user.name;
    if(new_team == "blue" && !is_on_team(username, teams.red) && !is_on_team(username, teams.blue))
    {
      teams.blue.push(username);
      msg.reply("Welcome to " + new_team + " team!");
    }
    else if(!is_on_team(username, teams.red) && !is_on_team(username, teams.blue))
    {
      teams.red.push(username);
      msg.reply("Welcome to " + new_team + " team!");
    }
    else
    {
      msg.reply(canned_errors[7]);
    }
  });
};


canned_requests = [/what is the score\s?/i,
 /[Ii] am the leader\s?/i,
 /set us up the bomb\s?/i,
 /start the (fucking)? game\s?/i,
 /call (.*)\s?/i,
 /(screw them|start a timer)\s?/i,
 /what are the teams\s?/i,
 /codenames\s?/i,
 /gimme the original board\s?/i,
 /gimme the board\s?/i,
 /gimme the keys\s?/i,
 /add me to (red|blue) (team)*\s?/i
 ];

canned_responses = [ "The score is: ",
"Sure you are, boss.",
"WELCOME TO CODENAMES!",
" team wins!",
"I've added you to that team.",
"Your teams consist of: ",
" is your team captain.",
"The current score is: ",
"The game has started!",
" team is up to guess!",
"A timer has been started!",  
"Time left: ",
"AWWW SHIT! TIME'S COUNTIN' DOWN! Time left: "
];

canned_errors = ["That team is full.",
"The game is already running.",
"You are missing at least one team leader.",
"There isn't a game running.",
"The teams are imbalanced.",
"That word isn't on the board. Are you just making up words now?",
"You're not even in this game! Shut that shit up!",
"No bitch, you are already on a team.",
"You wanna be the captain? Well, you ain't!"
]

feedback = ["Good choice! It's one of your team's agents!",
"Looks like you called a civilian.",
"Bad choice! It's one of the opposing team's agents!",
"Oh no! You've selected the assassin! What a pleb!"]

words = ["Acne",
"Acre",
"Addendum",
"Advertise",
"Aircraft",
"Aisle",
"Alligator",
"Alphabetize",
"America",
"Ankle",
"Apathy",
"Applause",
"Applesauce",
"Application",
"Archaeologist",
"Aristocrat",
"Arm",
"Armada",
"Asleep",
"Astronaut",
"Athlete",
"Atlantis",
"Aunt",
"Avocado",
"Baby-Sitter",
"Backbone",
"Bag",
"Baguette",
"Bald",
"Balloon",
"Banana",
"Banister",
"Baseball",
"Baseboards",
"Basketball",
"Bat",
"Battery",
"Beach",
"Beanstalk",
"Bedbug",
"Beer",
"Beethoven",
"Belt",
"Bib",
"Bicycle",
"Big",
"Bike",
"Billboard",
"Bird",
"Birthday",
"Bite",
"Blacksmith",
"Blanket",
"Bleach",
"Blimp",
"Blossom",
"Blueprint",
"Blunt",
"Blur",
"Boa",
"Boat",
"Bob",
"Bobsled",
"Body",
"Bomb",
"Bonnet",
"Book",
"Booth",
"Bowtie",
"Box",
"Boy",
"Brainstorm",
"Brand",
"Brave",
"Bride",
"Bridge",
"Broccoli",
"Broken",
"Broom",
"Bruise",
"Brunette",
"Bubble",
"Buddy",
"Buffalo",
"Bulb",
"Bunny",
"Bus",
"Buy",
"Cabin",
"Cafeteria",
"Cake",
"Calculator",
"Campsite",
"Can",
"Canada",
"Candle",
"Candy",
"Cape",
"Capitalism",
"Car",
"Cardboard",
"Cartography",
"Cat",
"Cd",
"Ceiling",
"Cell",
"Century",
"Chair",
"Chalk",
"Champion",
"Charger",
"Cheerleader",
"Chef",
"Chess",
"Chew",
"Chicken",
"Chime",
"China",
"Chocolate",
"Church",
"Circus",
"Clay",
"Cliff",
"Cloak",
"Clockwork",
"Clown",
"Clue",
"Coach",
"Coal",
"Coaster",
"Cog",
"Cold",
"College",
"Comfort",
"Computer",
"Cone",
"Constrictor",
"Continuum",
"Conversation",
"Cook",
"Coop",
"Cord",
"Corduroy",
"Cot",
"Cough",
"Cow",
"Cowboy",
"Crayon",
"Cream",
"Crisp",
"Criticize",
"Crow",
"Cruise",
"Crumb",
"Crust",
"Cuff",
"Curtain",
"Cuticle",
"Czar",
"Dad",
"Dart",
"Dawn",
"Day",
"Deep",
"Defect",
"Dent",
"Dentist",
"Desk",
"Dictionary",
"Dimple",
"Dirty",
"Dismantle",
"Ditch",
"Diver",
"Doctor",
"Dog",
"Doghouse",
"Doll",
"Dominoes",
"Door",
"Dot",
"Drain",
"Draw",
"Dream",
"Dress",
"Drink",
"Drip",
"Drums",
"Dryer",
"Duck",
"Dump",
"Dunk",
"Dust",
"Ear",
"Eat",
"Ebony",
"Elbow",
"Electricity",
"Elephant",
"Elevator",
"Elf",
"Elm",
"Engine",
"England",
"Ergonomic",
"Escalator",
"Eureka",
"Europe",
"Evolution",
"Extension",
"Eyebrow",
"Fan",
"Fancy",
"Fast",
"Feast",
"Fence",
"Feudalism",
"Fiddle",
"Figment",
"Finger",
"Fire",
"First",
"Fishing",
"Fix",
"Fizz",
"Flagpole",
"Flannel",
"Flashlight",
"Flock",
"Flotsam",
"Flower",
"Flu",
"Flush",
"Flutter",
"Fog",
"Foil",
"Football",
"Forehead",
"Forever",
"Fortnight",
"France",
"Freckle",
"Freight",
"Fringe",
"Frog",
"Frown",
"Gallop",
"Game",
"Garbage",
"Garden",
"Gasoline",
"Gem",
"Ginger",
"Gingerbread",
"Girl",
"Glasses",
"Goblin",
"Gold",
"Goodbye",
"Grandpa",
"Grape",
"Grass",
"Gratitude",
"Gray",
"Green",
"Guitar",
"Gum",
"Gumball",
"Hair",
"Half",
"Handle",
"Handwriting",
"Hang",
"Happy",
"Hat",
"Hatch",
"Headache",
"Heart",
"Hedge",
"Helicopter",
"Hem",
"Hide",
"Hill",
"Hockey",
"Homework",
"Honk",
"Hopscotch",
"Horse",
"Hose",
"Hot",
"House",
"Houseboat",
"Hug",
"Humidifier",
"Hungry",
"Hurdle",
"Hurt",
"Hut",
"Ice",
"Implode",
"Inn",
"Inquisition",
"Intern",
"Internet",
"Invitation",
"Ironic",
"Ivory",
"Ivy",
"Jade",
"Japan",
"Jeans",
"Jelly",
"Jet",
"Jig",
"Jog",
"Journal",
"Jump",
"Key",
"Killer",
"Kilogram",
"King",
"Kitchen",
"Kite",
"Knee",
"Kneel",
"Knife",
"Knight",
"Koala",
"Lace",
"Ladder",
"Ladybug",
"Lag",
"Landfill",
"Lap",
"Laugh",
"Laundry",
"Law",
"Lawn",
"Lawnmower",
"Leak",
"Leg",
"Letter",
"Level",
"Lifestyle",
"Ligament",
"Light",
"Lightsaber",
"Lime",
"Lion",
"Lizard",
"Log",
"Loiterer",
"Lollipop",
"Loveseat",
"Loyalty",
"Lunch",
"Lunchbox",
"Lyrics",
"Machine",
"Macho",
"Mailbox",
"Mammoth",
"Mark",
"Mars",
"Mascot",
"Mast",
"Matchstick",
"Mate",
"Mattress",
"Mess",
"Mexico",
"Midsummer",
"Mine",
"Mistake",
"Modern",
"Mold",
"Mom",
"Monday",
"Money",
"Monitor",
"Monster",
"Mooch",
"Moon",
"Mop",
"Moth",
"Motorcycle",
"Mountain",
"Mouse",
"Mower",
"Mud",
"Music",
"Mute",
"Nature",
"Negotiate",
"Neighbor",
"Nest",
"Neutron",
"Niece",
"Night",
"Nightmare",
"Nose",
"Oar",
"Observatory",
"Office",
"Oil",
"Old",
"Olympian",
"Opaque",
"Opener",
"Orbit",
"Organ",
"Organize",
"Outer",
"Outside",
"Ovation",
"Overture",
"Pail",
"Paint",
"Pajamas",
"Palace",
"Pants",
"Paper",
"Paper",
"Park",
"Parody",
"Party",
"Password",
"Pastry",
"Pawn",
"Pear",
"Pen",
"Pencil",
"Pendulum",
"Penis",
"Penny",
"Pepper",
"Personal",
"Philosopher",
"Phone",
"Photograph",
"Piano",
"Picnic",
"Pigpen",
"Pillow",
"Pilot",
"Pinch",
"Ping",
"Pinwheel",
"Pirate",
"Plaid",
"Plan",
"Plank",
"Plate",
"Platypus",
"Playground",
"Plow",
"Plumber",
"Pocket",
"Poem",
"Point",
"Pole",
"Pomp",
"Pong",
"Pool",
"Popsicle",
"Population",
"Portfolio",
"Positive",
"Post",
"Princess",
"Procrastinate",
"Protestant",
"Psychologist",
"Publisher",
"Punk",
"Puppet",
"Puppy",
"Push",
"Puzzle",
"Quarantine",
"Queen",
"Quicksand",
"Quiet",
"Race",
"Radio",
"Raft",
"Rag",
"Rainbow",
"Rainwater",
"Random",
"Ray",
"Recycle",
"Red",
"Regret",
"Reimbursement",
"Retaliate",
"Rib",
"Riddle",
"Rim",
"Rink",
"Roller",
"Room",
"Rose",
"Round",
"Roundabout",
"Rung",
"Runt",
"Rut",
"Sad",
"Safe",
"Salmon",
"Salt",
"Sandbox",
"Sandcastle",
"Sandwich",
"Sash",
"Satellite",
"Scar",
"Scared",
"School",
"Scoundrel",
"Scramble",
"Scuff",
"Seashell",
"Season",
"Sentence",
"Sequins",
"Set",
"Shaft",
"Shallow",
"Shampoo",
"Shark",
"Sheep",
"Sheets",
"Sheriff",
"Shipwreck",
"Shirt",
"Shoelace",
"Short",
"Shower",
"Shrink",
"Sick",
"Siesta",
"Silhouette",
"Singer",
"Sip",
"Skate",
"Skating",
"Ski",
"Slam",
"Sleep",
"Sling",
"Slow",
"Slump",
"Smith",
"Sneeze",
"Snow",
"Snuggle",
"Song",
"Space",
"Spare",
"Speakers",
"Spider",
"Spit",
"Sponge",
"Spool",
"Spoon",
"Spring",
"Sprinkler",
"Spy",
"Square",
"Squint",
"Stairs",
"Standing",
"Star",
"State",
"Stick",
"Stockholder",
"Stoplight",
"Stout",
"Stove",
"Stowaway",
"Straw",
"Stream",
"Streamline",
"Stripe",
"Student",
"Sun",
"Sunburn",
"Sushi",
"Swamp",
"Swarm",
"Sweater",
"Swimming",
"Swing",
"Tachometer",
"Talk",
"Taxi",
"Teacher",
"Teapot",
"Teenager",
"Telephone",
"Ten",
"Tennis",
"Thief",
"Think",
"Throne",
"Through",
"Thunder",
"Tide",
"Tiger",
"Time",
"Tinting",
"Tiptoe",
"Tiptop",
"Tired",
"Tissue",
"Toast",
"Toilet",
"Tool",
"Toothbrush",
"Tornado",
"Tournament",
"Tractor",
"Train",
"Trash",
"Treasure",
"Tree",
"Triangle",
"Trip",
"Truck",
"Tub",
"Tuba",
"Tutor",
"Television",
"Twang",
"Twig",
"Twitterpated",
"Type",
"Unemployed",
"Upgrade",
"Vest",
"Vision",
"Wag",
"Water",
"Watermelon",
"Wax",
"Wedding",
"Weed",
"Welder",
"Whatever",
"Wheelchair",
"Whiplash",
"Whisk",
"Whistle",
"White",
"Wig",
"Will",
"Windmill",
"Winter",
"Wish",
"Wolf",
"Wool",
"World",
"Worm",
"Wristwatch",
"Yardstick",
"Zamboni",
"Zen",
"Zero",
"Zipper",
"Zone",
"Zo"];
