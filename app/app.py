from flask import Flask, render_template, send_from_directory

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def index():
        context = {
            'siteTitle': "Coffeeroasters subscription site"
            }
          
        return render_template('index.html', **context)

    @app.route('/robots.txt')
    def robots_txt():
        try:
            return send_from_directory(app.static_folder, 'robots.txt')
        except FileNotFoundError:
            logging.error("robots.txt not found")
            return "robots.txt not found", 404

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
    
    
