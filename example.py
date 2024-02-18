import spotipy
from spotipy.oauth2 import SpotifyOAuth

"""
INITIALIZATION
"""
scope= " ".join([
    "ugc-image-upload",
    "user-read-recently-played",
    "user-top-read",
    "user-read-playback-position",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "app-remote-control",
    "streaming",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-follow-modify",
    "user-follow-read",
    "user-library-modify",
    "user-library-read",
    "user-read-email",
    "user-read-private"
])

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))

current_user = sp.current_user()

"""
FIND TRACK ID 
"""
track_name = "November Rain"
# artist_name = "Metallica"  # Optional, but helps narrow down the search
results = sp.search(q='track:' + track_name, type='track')

# Extract the Track ID
if results['tracks']['items']:
    # Assuming the first search result is the correct track
    track_id = results['tracks']['items'][0]['id']
    print(f"Track ID: {track_id}")
else:
    print("No results found.")
    

"""
FIND TRACK INFO
"""

print(sp.audio_features(["3YRCqOhFifThpSRFJ1VWFM"]))
# """
# FOLLOW ARTISTS.
# """
# artist_names = ["The Beatles", "The Rolling Stones", "Led Zeppelin", "Jimi Hendrix", 
#                 "Pink Floyd", "The Who", "Queen", "David Bowie", "The Doors", "Eric Clapton"]
# artist_ids = []
# for name in artist_names:
#     result = sp.search(q='artist:' + name, type='artist', limit=1)
#     if result['artists']['items']:
#         artist = result['artists']['items'][0]
#         artist_ids.append(artist['id'])
#     else:
#         print(f"Artist {name} not found.")
        
# sp.user_follow_artists(artist_ids)

# def get_followed_artists(sp, limit=20):
#     followed_artists = []
#     results = sp.current_user_followed_artists(limit=limit)
#     while results:
#         artists = results['artists']
#         for item in artists['items']:
#             followed_artists.append(item['name'])
#             results = sp.next(artists)
#         else:
#             results = None
#     return followed_artists

# followed_artists = get_followed_artists(sp)
# for artist in followed_artists:
#     print(artist)

# """
# GET TOP ARTISTS (BASED ON LISTENING HISTORY)
# """
# print('\n\n\n\n\n')
# top_tracks = sp.current_user_top_artists()
# print(top_tracks)

# """
# UNFOLLOW ARTISTS (RESET)
# """
# print('\n\n\n\n')
# sp.user_unfollow_artists(artist_ids)
# print(get_followed_artists(sp))


# """
# RECOMMENDATION
# """
# recommendations = sp.recommendations(seed_artists=artist_ids[:5], limit=20)
# for track in recommendations['tracks']:
#     print(f"{track['name']} by {' & '.join(artist['name'] for artist in track['artists'])}")


