from flask import Flask, render_template, send_from_directory


def create_app():
    app = Flask(__name__)

    @app.route("/")
    def index():
        collection = [
            {
                "image": "./static/images/home/desktop/image-gran-espresso.png",
                "title": "Create Your Plan",
                "description": "Build a subscription plan that best fits your needs. We offer an assortment of the best artisan coffees from around the globe delivered fresh to your door.",
            },
            {
                "image": "./static/images/home/desktop/image-planalto.png",
                "title": "Choose the best Coffee for you",
                "description": "Customize your order frequency, quantity, even your roast style and grind type. Pause, skip or cancel your subscription with no commitment through our online portal.",
            },
            {
                "image": "./static/images/home/desktop/image-piccollo.png",
                "title": "Enjoy exclusive benefits",
                "description": "Receive a 10% discount on all our coffee. Gain access to exclusive limited edition coffees, rare and exclusive offerings.",
            },
            {
                "image": "./static/images/home/desktop/image-danche.png",
                "title": "Enjoy exclusive benefits",
                "description": "Receive a 10% discount on all our coffee. Gain access to exclusive limited edition coffees, rare and exclusive offerings.",
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
