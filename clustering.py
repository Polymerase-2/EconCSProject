#%%
import pandas as pd
import spacy

song_df = pd.read_csv("song_dataset.csv")
print("columns: ", song_df.columns)
song_df.head(30)




# Load the spaCy model
# spacy.cli.download('en_core_web_lg')
nlp = spacy.load('en_core_web_md')

# Assuming your DataFrame is named df and has the columns 'artists', 'album_name', 'track_name'
# Let's generate embeddings for one column as an example

def get_spacy_embeddings(texts):
    # Process texts to generate embeddings
    embeddings = [nlp(text).vector for text in texts]
    return embeddings

# Generate embeddings for each column
song_df['artists_embeddings'] = get_spacy_embeddings(song_df['artists'])
song_df['album_name_embeddings'] = get_spacy_embeddings(song_df['album_name'])
song_df['track_name_embeddings'] = get_spacy_embeddings(song_df['track_name'])