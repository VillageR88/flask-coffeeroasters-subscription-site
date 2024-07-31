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


# @app.route("/<page>")
# def content(page):
#     try:
#         return render_template(f"{page}/page.html")
#     except TemplateNotFound:
#         return jsonify({"error": "Page not found"}), 404


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
    headquarters = [
        {
            "image": "./static/images/about/desktop/illustration-uk.svg",
            "title": "United Kingdom",
            "address": "68 Asfordby Rd",
            "city": "Alcaston",
            "zipCode": "SY6 1YA",
            "phone": "+44 1241 918425",
        },
        {
            "image": "./static/images/about/desktop/illustration-canada.svg",
            "title": "Canada",
            "address": "1528 Eglinton Avenue",
            "city": "Toronto",
            "zipCode": "Ontario M4P 1A6",
            "phone": "+1 416 485 2997",
        },
        {
            "image": "./static/images/about/desktop/illustration-australia.svg",
            "title": "Australia",
            "address": "36 Swanston Street",
            "city": "Kewell",
            "zipCode": "Victoria",
            "phone": "+61 4 9928 3629",
        },
    ]
    social = [
        "./components/facebook.html",
        "./components/twitter.html",
        "./components/instagram.html",
    ]
    createPlanNav = [
        "Preferences",
        "Bean Type",
        "Quantity",
        "Grind Option",
        "Deliveries",
    ]
    createPlanBlocks = [
        {
            "title": "How do you drink your coffee?",
            "options": [
                {
                    "title": "Capsule",
                    "description": "Compatible with Nespresso systems and similar brewers.",
                },
                {
                    "title": "Filter",
                    "description": "For pour over or drip methods like Aeropress, Chemex, and V60.",
                },
                {
                    "title": "Espresso",
                    "description": "Dense and finely ground beans for an intense, flavorful experience.",
                },
            ],
        },
        {
            "title": "What type of coffee?",
            "options": [
                {
                    "title": "Single Origin",
                    "description": "Distinct, high quality coffee from a specific family-owned farm.",
                },
                {
                    "title": "Decaf",
                    "description": "Just like regular coffee, except the caffeine has been removed.",
                },
                {
                    "title": "Blended",
                    "description": "Combination of two or three dark roasted beans of organic coffees.",
                },
            ],
        },
        {
            "title": "How much would you like?",
            "options": [
                {
                    "title": "250g",
                    "description": "Perfect for the solo drinker. Yields about 12 delicious cups.",
                },
                {
                    "title": "500g",
                    "description": "Perfect option for a couple. Yields about 40 delectable cups.",
                },
                {
                    "title": "1000g",
                    "description": "Perfect for offices and events. Yields about 90 delightful cups.",
                },
            ],
        },
        {
            "title": "Want us to grind them?",
            "options": [
                {
                    "title": "Wholebean",
                    "description": "Best choice if you cherish the full sensory experience.",
                },
                {
                    "title": "Filter",
                    "description": "For drip or pour-over coffee methods such as V60 or Aeropress.",
                },
                {
                    "title": "Cafetiére",
                    "description": "Course ground beans specially suited for french press coffee.",
                },
            ],
        },
        {
            "title": "How often should we deliver?",
            "options": [
                {
                    "title": "Every week",
                    "description": "$14.00 per shipment. Includes free first-class shipping.",
                },
                {
                    "title": "Every 2 weeks",
                    "description": "$17.25 per shipment. Includes free priority shipping.",
                },
                {
                    "title": "Every month",
                    "description": "$22.50 per shipment. Includes free priority shipping.",
                },
            ],
        },
    ]
    context = {
        "siteTitle": "Coffeeroasters subscription site",
        "collection": collection,
        "whyChooseUs": whyChooseUs,
        "howItWorks": howItWorks,
        "social": social,
        "headquarters": headquarters,
        "createPlanNav": createPlanNav,
        "createPlanBlocks": createPlanBlocks,
    }
    return context


if __name__ == "__main__":
    app.run(debug=True)
