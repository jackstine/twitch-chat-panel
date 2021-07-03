// this gets all badges from the data structure defined in
// https://dev.twitch.tv/docs/api/reference#get-global-chat-badges
x.map(el => el.versions.map(el => Object.keys(el).map(key => s.add(key))))
 {"id", "image_url_1x", "image_url_2x", "image_url_4x"}

