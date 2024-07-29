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
        whyChooseUs = [
            {
                "image": "./static/images/home/desktop/icon-coffee-bean.svg",
                "title": "Best quality",
                "description": "Discover an endless variety of the world’s best artisan coffee from each of our roasters.",
            },
            {
                "image": "./static/images/home/desktop/icon-gift.svg",
                "title": "Exclusive benefits",
                "description": "Special offers and swag when you subscribe, including 30% off your first shipment.",
            },
            {
                "image": "./static/images/home/desktop/icon-truck.svg",
                "title": "Free shipping",
                "description": "We cover the cost and coffee is delivered fast. Peak freshness: guaranteed.",
            },
        ]
        howItWorks = [
            {
                "title": "Pick your coffee",
                "description": "Select from our evolving range of artisan coffees. Our beans are ethically sourced and we pay fair prices for them. There are new coffees in all profiles every month for you to try out.",
            },
            {
                "title": "Choose the frequency",
                "description": "Customize your order frequency, quantity, even your roast style and grind type. Pause, skip or cancel your subscription with no commitment through our online portal.",
            },
            {
                "title": "Receive and enjoy!",
                "description": "We ship your package within 48 hours, freshly roasted. Sit back and enjoy award-winning world-class coffees curated to provide a distinct tasting experience.",
            },
        ]
        social = [
            {
                "component": "./components/facebook.html",
                "alt": "Facebook",
            },
            {
                "component": "./components/twitter.html",
                "alt": "Twitter",
            },
            {
                "component": "./components/instagram.html",
                "alt": "Instagram",
            },
        ]
        context = {
            "siteTitle": "Coffeeroasters subscription site",
            "collection": collection,
            "whyChooseUs": whyChooseUs,
            "howItWorks": howItWorks,
            "social": social,
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
