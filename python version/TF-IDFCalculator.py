from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Your data


# Open the file in read mode with utf-8 encoding
with open('jobTitles.txt', 'r', encoding='utf-8') as file:
    # Read all lines and save them in a list
    job_titles = [line.strip() for line in file]

# Now job_titles is a list of job titles
print(type([job_titles[0]]))

# Create the Transform
vectorizer = TfidfVectorizer()

# Tokenize and build vocab
vectorizer.fit_transform(job_titles)

# Encode document
# vector = vectorizer.transform(job_titles)

# Calculate Cosine Similarity
cos_sim = cosine_similarity(vectorizer.transform(["Web Developer Full-stack (NodeJS, JavaScript)"]), vectorizer.transform(["Mobile Developer (iOS/Android - All Levels)"]))
print(cos_sim)
