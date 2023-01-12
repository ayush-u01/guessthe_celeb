from flask import Flask, request, jsonify
import util
app = Flask(__name__)

# create http endpont - classify_image
@app.route('/classify_image', methods = ['GET', 'POST'])
def classify_image():
    # take out image_data in b64 by request
    image_data = request.form['image_data']

    # geberate response by passing image_data into classify_image and jsonify it
    response = jsonify(util.classify_image(image_data))
    #add Access-Control-Allow-Origin into header
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    # return "Hi" 

if __name__ == "__main__":
    util.load_saved_artifacts()
    app.run(port = 5000)
