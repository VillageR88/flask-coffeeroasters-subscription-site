from flask import Flask, render_template, send_from_directory


def create_app():
    app = Flask(__name__)

    @app.route("/")
    def index():
        collection = [
            {
                "image": "./static/images/home/desktop/image-gran-espresso.png",
                "title": "Gran Espresso",
                "description": "Light and flavorful blend with cocoa and black pepper for an intense experience.",
            },
            {
                "image": "./static/images/home/desktop/image-planalto.png",
                "title": "Planalto",
                "description": "Brazilian dark roast with rich and velvety body, and hints of fruits and nuts.",
            },
            {
                "image": "./static/images/home/desktop/image-piccollo.png",
                "title": "Piccollo",
                "description": "Mild and smooth blend featuring notes of toasted almond and dried cherry.",
            },
            {
                "image": "./static/images/home/desktop/image-danche.png",
                "title": "Danche",
                "description": "Ethiopian hand-harvested blend densely packed with vibrant fruit notes.",
            },
        ]
        context = {
            "siteTitle": "Coffeeroasters subscription site",
            "collection": collection,
        }

        return render_template("home/index.html", **context)

    @app.route("/robots.txt")
    def robots_txt():
        try:
            return send_from_directory(app.static_folder, "robots.txt")
        except FileNotFoundError:
            logging.error("robots.txt not found")
            return "robots.txt not found", 404

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
