import random
# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, flash, request, render_template

# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)
app.config.from_mapping(
        # a default secret that should be overridden by instance config
        SECRET_KEY="dev"
    )
 
# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.
@app.route("/")
def index():
   return render_template("form.html")
 
# @app.route("/pypassword")
# def createPythonPassword():
#   """Generates a random password using user inputs."""

@app.route('/pypassword', methods = ['POST', 'GET'])
def pyPassword():
   if request.method == 'POST':
      error = None
      passOptions = []
      wantLength = int(request.form['wantLength'])

      if wantLength < 8 or wantLength < 128:
         error = "Password length must be between 8-128 characters."
      
      # Build possible character options for password
      try:
         if request.form.get('wantUpper'):
            passOptions.extend(passwordParameters["passUpper"])
         if request.form.get('wantLower'):
            passOptions.extend(passwordParameters["passLower"])
         if request.form.get('wantNumber'):
            passOptions.extend(passwordParameters["passNumber"])
         if request.form.get('wantSpecial'):
            passOptions.extend(passwordParameters["passSpecial"])
      except:
         error = "Must select at least one character type."

      if passOptions == []:
         error = "Must select at least one character type."

      # Show errors
      if error is not None:
         flash(error)
         # return redirect(url_for('index'))


      # Run Password Generation
      generatedPassword = generatePassword(passOptions, wantLength)

      return render_template("generatedPassword.html", result = generatedPassword)
   # On GET, return form.html only
   return render_template("form.html")

# Collection of possible password characters, in lists.
passwordParameters = {
    "passUpper": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    "passLower": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    "passNumber": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    "passSpecial": [" ", "!", "'", "#", "$", "%", "&", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "`", "{", "|", "}", "~"],       
}
# Password generation function
def generatePassword(passOptions, wantLength):
   password = ""

   for _ in range(wantLength):
      password += random.choice(passOptions)
   return password

# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application
    # on the local development server.
    app.run(debug = True, use_debugger=False, use_reloader=False)