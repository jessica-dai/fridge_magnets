import markovify
# import nltk
# from nltk.corpus import treebank

filenames = ['alice.txt']

for filename in filenames:

    with open(filename) as f: 
        text = f.read()

    writer = markovify.Text(text)

    sentences = []

    for i in range(30):
        sentences.append(writer.make_sentence())
    
    print(sentences)