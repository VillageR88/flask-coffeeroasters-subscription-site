from flask import Flask, render_template, jsonify, send_from_directory
from jinja2 import TemplateNotFound
import logging

app = Flask(__name__)


@app.route("/")
def home():
    context = get_context()
    return render_template("home/page.html", **context)


@app.route("/about-us")
def about_us():
    context = get_context()
    return render_template("about-us/page.html", **context)


@app.route("/create-your-plan")
def create_your_plan():
    context = get_context()
    return render_template("create-your-plan/page.html", **context)


@app.route("/<page>")
def content(page):
    try:
        return render_template(f"{page}/page.html")
    except TemplateNotFound:
        return jsonify({"error": "Page not found"}), 404


@app.route("/robots.txt")
def robots_txt():
    try:
        return send_from_directory(app.static_folder, "robots.txt")
    except FileNotFoundError:
        logging.error("robots.txt not found")
        return "robots.txt not found", 404


def get_context():
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
        "./components/facebook.html",
        "./components/twitter.html",
        "./components/instagram.html",
    ]
    context = {
        "siteTitle": "Coffeeroasters subscription site",
        "collection": collection,
        "whyChooseUs": whyChooseUs,
        "howItWorks": howItWorks,
        "social": social,
    }
    return context


if __name__ == "__main__":
    app.run(debug=True)
