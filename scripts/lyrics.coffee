# Description:
#   Lyrics
module.exports = (robot) ->
  robot.respond /lyrics (.*)/i, (msg) ->
    genius_api_url = 'https://api.genius.com/search?q='
    genius_api_key = process.env.HUBOT_GENIUS_API_KEY
    lyrics_api_url = 'http://genius-api.com/api/lyricsInfo'
    query = msg.match[1]

    robot.http(genius_api_url + query)
      .header("Authorization", "Bearer #{genius_api_key}")
      .get() (err, res, body) ->

        data = JSON.parse body
        song_url = data.response.hits[0].result.url

        lyrics_post_data = "link=#{song_url}"

        robot.http(lyrics_api_url)
          .header("Content-Type", "application/x-www-form-urlencoded")
          .post(lyrics_post_data) (err, res, body) ->
            data = JSON.parse body
            verses = flatten(section.verses for section in data.lyrics.sections)
            contents = (verse.content for verse in verses)
            lyrics = (content.trim().split(/\n+/) for content in contents when content?)

            # This could produce more interesting variety if you start with
            # a random line in a random section and maybe go back to lines
            # and forward 2 lines
            msg.send (msg.random lyrics)[0..4].join("\n")

flatten = (array) ->
  flattened = []
  for element in array
    if '[object Array]' is Object::toString.call element
      flattened = flattened.concat flatten element
    else
      flattened.push element
  flattened
  