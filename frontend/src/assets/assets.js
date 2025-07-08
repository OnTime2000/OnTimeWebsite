import p_img1_1 from './p_img1_1.jpeg'
import p_img1_2 from './p_img1_2.jpeg'
import p_img2_1 from './p_img2_1.jpeg'
import p_img3_1 from './p_img3_1.jpeg'
import p_img3_2 from './p_img3_2.jpeg'
import p_img3_3 from './p_img3_3.jpeg'
import p_img4_1 from './p_img4_1.jpeg'
import p_img4_2 from './p_img4_2.jpeg'
import p_img5_1 from './p_img5_1.jpeg'
import p_img5_2 from './p_img5_2.jpeg'
import p_img6_1 from './p_img6_1.jpeg'
import p_img6_2 from './p_img6_2.jpeg'
import p_img6_3 from './p_img6_3.jpeg'
import p_img7_1 from './p_img7_1.jpeg'
import p_img7_2 from './p_img7_2.jpeg'
import p_img7_3 from './p_img7_3.jpeg'
import p_img7_4 from './p_img7_4.jpeg'
import p_img8_1 from './p_img8_1.jpeg'
import p_img8_2 from './p_img8_2.jpeg'
import p_img9_1 from './p_img9_1.jpeg'
import p_img9_2 from './p_img9_2.jpeg'
import p_img10_1 from './p_img10_1.jpeg'
import p_img11_1 from './p_img11_1.jpeg'
import p_img11_2 from './p_img11_2.jpeg'
import p_img12_1 from './p_img12_1.jpeg'
import p_img12_2 from './p_img12_2.jpeg'
import p_img12_3 from './p_img12_3.jpeg'
import p_img13_1 from './p_img13_1.jpeg'

import logo from './logo.png'
import hero_img from './hero_img.jpg'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.jpg'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'

export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon
}

export const products = [
    {
        _id: "00001",
        name: " Customized Laser Carved Wooden Blocks",
        description: "Premium-quality wooden decor, laser-engraved with high-precision detailing — perfect for personalized gifts, home accents, or timeless keepsakes.",
        price: 999,
        image: [p_img1_1,p_img1_2],
        category: "Wooden",
        sizes: [],
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "00002",
        name: "Customized Named Pens",
        description: "Elegant metal pen personalized with your name  — perfect for gifting, office use, or daily writing in style.",
        price: 399,
        image: [p_img2_1],
        category: "Stationery",
        sizes: ["Regular"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "00003",
        name: "Customized Printed Cups",
        description: "Custom-printed ceramic mug with your photo, name, or message — a perfect gift for birthdays, anniversaries, or daily coffee moments.",
        price: 299,
        image: [p_img3_1,p_img3_2,p_img3_3],
        category: "Cups",
        sizes: ["Regular"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "00004",
        name: "Customized LED Lamps",
        description: "",
        price: 899,
        image: [p_img4_1,p_img4_2],
        category: "LED ",
        sizes: ["Regular"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "00005",
        name: "Customized Photo Frame - Rectangular",
        description: "",
        price: 400,
        image: [p_img5_1,p_img5_2],
        category: "Frames",       
        sizes: ["4x6", "5x7", "6x8","8x10","8x12","12x15","16x20","16x24","20x30","24x36"],
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "00006",
        name: "Customized Photo Frame - Tabletop",
        description: "",
        price: 400,
        image: [p_img6_1,p_img6_2,p_img6_3],
        category: "Frames",
        sizes: ["Regular"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "00007",
        name: "Customized Named Bottles",
        description: "",
        price: 400,
        image: [p_img7_1,p_img7_2,p_img7_3,p_img7_4],
        category: "Cups",
        sizes: ["Regular"],
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "00008",
        name: "Customized Named Pencils",
        description: "",
        price: 300,
        image: [p_img8_1,p_img8_2],
        category: "Stationery",
        sizes: ["Regular"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "00009",
        name: "Customized Photo Clocks",
        description: "",
        price: 1299,
        image: [p_img9_1,p_img9_2],
        category: "Clocks",
        sizes: ["Regular"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "00010",
        name: "Customized Neon LED Lights",
        description: "",
        price: 1299,
        image: [p_img10_1],
        category: "LED",
        sizes: ["Heart ","Circle"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "00011",
        name: "Customized LED Frames",
        description: "",
        price: 899,
        image: [p_img11_1,p_img11_2],
        category: "LED",
        sizes: ["Regular"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "00012",
        name: "Customized Pooja Thali",
        description: "",
        price: 899,
        image: [p_img12_1,p_img12_2,p_img12_3],
        category: "Thali's",
        sizes: ["Basic","Premium"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "00013",
        name: "Customized Pillows",
        description: "",
        price: 899,
        image: [p_img13_1],
        category: "Pillows",
        sizes: ["Regular"],
        date: 1716621345448,
        bestseller: false
    },
    
]