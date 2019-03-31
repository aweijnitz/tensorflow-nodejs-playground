# Project Notes

__The Big Idea__

**Neural networks are general function approximators**, that is; IF the underlying data 
can be described using a function over a set, a neural network can be trained to 
approximate that (unknown) function. The training requires *labeled* training data.

*Labeled* in this case means that the dataset has a correct classification, i.e. 
"This image contains a human face.".

## Classifiers and Terminology

__Basics__

`model` - A function with parameters to optimize that describes the data. Once the parameters have been found, the model fits the data well and can be used to predict new values. The general case is a neural network with a given set of layers.

`training` - Feeding a known dataset through the model, calculating the loss and then changing the parameters to minimize the loss (minimizing the difference between expected value and actual values, as given by the labels).

`dataset` - A bunch of known values to fit the model to, using training.

`labels` -  Metadata attached to the dataset, that describes the data. ("This image contains a car")

`loss function` -  A function which returns the difference/distance/error between predicted value and the actual. It returns the value to optimize, for example Mean Square Error, for curve fitting (regression).

`optimizer` -  A function used to minimize the loss function. It tries to adjust the parameters/weights in the network, so that it approximates the dataset.

`learning rate` - Describes how how big steps/deltas the optimizer should work with when trying to minimize the loss. 



__Predicting one out a given number of options__

Ex. Map the input to one of ```{ 'apple', 'orange', 'pear'}```

Use ```softmax``` for this. (Bolzman distribution, where the output vector is a set of probabilities, summing up to one)
.

__Dividing up the problem__

Want to analyze many features (eg. “contains glass” and “is image blurry”)? Setup more models for each of the feature. Don’t mix it up all in one.

__Support Vector Machine (SVG)__

Support Vector Machines. An algorithm that works by creating linear decision boundaries to classify multiple classes.
SVM being a supervised learning algorithm requires clean, annotated data.


## Tensorflow links

- [Blogpost: Overview/Announcement Tensorflow 2.0](https://hackernoon.com/tensorflow-is-dead-long-live-tensorflow-49d3e975cf04)


## Ludwig - Deep Learning Toolbox for experimentation

- [Introducing Ludwig](https://eng.uber.com/introducing-ludwig/)
- [Ludwig Home](https://uber.github.io/ludwig/)

## Data Preparation

### Data sets

- [Caffe Model Zoo Intro](http://caffe.berkeleyvision.org/model_zoo.html)
- [Caffe Model Zoo](https://github.com/BVLC/caffe/wiki/Model-Zoo)
- [GoogleAPI Open Images Dataset](https://storage.googleapis.com/openimages/web/visualizer/index.html?set=train&c=%2Fm%2F015p6) 

### Image Prep

#### Base
- Uniform Aspect Ratio
- Uniform scale/size/shape ```(128x128xR[0-255]xG[0-255]xB[0-255])```


#### Better/Refined
- Calculate the mean image
- Normalize image
    - Subtracting the mean from each pixel
    - dividing the result by the standard deviation.
    
- Normalize values to be in range [0,1]
- Reduce dimensionality (collapse RGB -> Greyscale)
- Data augmentation
    - (optional) Generate additional training data by adding new images to the set, which are slightly rotated, scaled, or mirrored versions of the data (if this makes sense in the context) 
    - Extract features using OpenCV and use those as well in training and prediction (just add to the input vector)
    
    
### Using OpenCV to do basic feature extraction and prep

Feature like normalized histogram converting to greyscaleing.

See [this article](https://medium.com/@dataturks/understanding-svms-for-image-classification-cf4f01232700) 
and [Node.js meets OpenCV’s Deep Neural Networks — Fun with Tensorflow and Caffe](https://medium.com/@muehler.v/node-js-meets-opencvs-deep-neural-networks-fun-with-tensorflow-and-caffe-ff8d52a0f072)

#### Mixed Links (tutorials, tips, examples)
- [Image Data Pre-Processing for Neural Networks](https://becominghuman.ai/image-data-pre-processing-for-neural-networks-498289068258)
- [How to Prepare a Photo Caption Dataset for Training a Deep Learning Model](https://machinelearningmastery.com/prepare-photo-caption-dataset-training-deep-learning-model/)
- [SVG, Feature extraction using OpenCV](https://medium.com/@dataturks/understanding-svms-for-image-classification-cf4f01232700)
- [GitHub: opencv4nodejs](https://github.com/justadudewhohacks/opencv4nodejs)
- [Highlevel ML Toolkit - ML5 ](https://ml5js.org/)
- [Style Transfer Demo With Magenta.js](https://style-transfer.glitch.me/)
- [Magenta.js](https://magenta.tensorflow.org/get-started/#magenta-js)

#### Generative Adverserial Neworks (GAN:s)

- [pix2pix - Filling in the gaps](https://affinelayer.com/pixsrv/)
- The original pix2pix paper [Image-to-Image Translation with Conditional Adversarial Networks](https://arxiv.org/abs/1611.07004)
- [Learning To See video](https://vimeo.com/260612034)


__Stanford Lecture 13 on Generative Algorithms__

- [PixelRNN and PixelCNN](https://youtu.be/5WoItGTWV54?t=665)
- [Variational Autoencoders](https://youtu.be/5WoItGTWV54?t=1181)
- [Generative Adverserial Networks (GAN)](https://youtu.be/5WoItGTWV54?t=3081)
- [The GAN Zoo](https://youtu.be/5WoItGTWV54?t=4411)
- [GAN pro/contras](https://youtu.be/5WoItGTWV54?t=4460)
- []()


#### Reinforcement Learning (AI learns how to play a game for example)

- [Deep Reinforcement Learning: Pong from Pixels](http://karpathy.github.io/2016/05/31/rl/)
- [Paper - Learning to Play Pong using Policy Gradient Learning](https://arxiv.org/abs/1807.08452)
- []()

https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css

<link href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css" rel="stylesheet">


### One-shot learning with Siamese Networks

*Idea* - Mimic the ability for humans to recognize a person from his/her face, 
after only having met once.

*"Siamese networks are a special type of neural network architecture. 
Instead of a model learning to classify its inputs, the neural networks learns 
to differentiate between two inputs. It learns the similarity between them."*

- [Hacker Noon Two Part Article about Siamese Networks](https://hackernoon.com/one-shot-learning-with-siamese-networks-in-pytorch-8ddaab10340e) 

### Natural Language Generation


- [Wikipeida About NLG](https://en.wikipedia.org/wiki/Natural-language_generation)
- [Blog: How do I Build an NLG System: Tools?](https://ehudreiter.com/2017/01/26/nlg-system-tools/)

### word2vec - Word similarity

- [Blogpost: How to get started with word2vec](https://medium.freecodecamp.org/how-to-get-started-with-word2vec-and-then-how-to-make-it-work-d0a2fca9dad3)
- [Most popular word2vec lib: __Gensim__](https://github.com/RaRe-Technologies/gensim/blob/develop/docs/notebooks/gensim%20Quick%20Start.ipynb)
- [Presentation: Finding similar Github Projects](https://www.slideshare.net/vote/finding-similar-projects-in-github-using-word2vec-and-wmd)
- []()

#### Document similarity

Either use gensims's doc2vec, or word2vec together with Word Mover Distance (WMD).
There is also universal sentence encoder in Tensorflow.

- [Word mover distance](https://github.com/RaRe-Technologies/gensim/blob/develop/docs/notebooks/WMD_tutorial.ipynb)
- [Universal Sentence Encoder](https://tfhub.dev/google/universal-sentence-encoder/2)
- [doc2vec tutorial](https://rare-technologies.com/doc2vec-tutorial/)
- []()
