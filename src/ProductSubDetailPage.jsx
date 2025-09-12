import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductVariants from "./ProductVariants";

// ==================== Product Data ====================
const allSubProducts = {
    "Secure Lite": {
        name: "Secure Lite",
        description:
            "This is a LUMENZA digital safe locker, designed with a sleek black matte finish and equipped with an electronic keypad lock. It comes in different sizes, offering secure storage for valuables with modern security features.",
        images: [
            "https://i.pinimg.com/736x/8a/11/80/8a118042d769d824337062254afb1dc5.jpg",
            "https://i.pinimg.com/736x/ad/f6/f3/adf6f3a8672d5e6974623ba82a5dd204.jpg",
        ],
        features: [
            "Digital Lock",
            "Door : 3mm, Body: 1.5mm",
            "Compact Design",
            "Multiple Sizes",
            "Fire Resistant",
            "Strong Hinges",
            "Key Override",
            "Anti-Theft Bolts",
            "Battery Operated",
            "Durable Finish",
        ],
        productDetails: [
            {
                title: "Secure Lite: 12L-MatteBlack",
                image: "https://i.pinimg.com/736x/fd/77/ad/fd77ad13a43235ec28369ecb661ed956.jpg",
                specs: [
                    "(DxWxH): 20 x 31 x 20cm",
                    "Weight(approx): 5.60 kg",
                    "Material: Heavy-duty Steel",
                    "Lock Type: Digital Keypad",
                ],
            },
            {
                title: "Secure Lite: 20L-MatteBlack",
                image: "https://i.pinimg.com/736x/cf/96/ec/cf96ec61d847273cff0640074cd56cb2.jpg",
                specs: [
                    "(DxWxH): 25 x 35 x 25cm",
                    "Weight(approx): 6.31 kg",
                    "Material: Heavy-duty Steel",
                    "Lock Type: Digital keypad",
                ],
            },
            {
                title: "Secure Lite: 32L-MatteBlack",
                image: "https://i.pinimg.com/736x/cf/96/ec/cf96ec61d847273cff0640074cd56cb2.jpg",
                specs: [
                    "(DxWxH): 30 x 38 x 30cm",
                    "Weight(approx): 9.78 kg",
                    "Material: Heavy-duty Steel",
                    "Lock Type: Digital Keypad",
                ],
            },
            {
                title: "Secure Lite: 48L-MatteBlack",
                image: "https://i.pinimg.com/736x/ef/b6/94/efb6949a53dc9375da5bef960c9b209c.jpg",
                specs: [
                    "(DxWxH): 35 x 35 x 42cm",
                    "Weight(approx): 12.55 kg",
                    "Material: Heavy-duty Steel",
                    "Lock Type: Digital Keypad",
                ],
            },
            {
                title: "Secure Lite: 55L-MatteBlack",
                image: "https://i.pinimg.com/736x/99/fe/98/99fe9800e25b7da267979ec436a39675.jpg",
                specs: [
                    "(DxWxH): 33 x 35 x 50cm",
                    "Weight(approx): 13.88 kg",
                    "Material: Heavy-duty Steel",
                    "Lock Type: Digital Keypad",
                ],
            },
        ],
    },
    "Secure X": {
        name: "Secure X",
        description:
            "LUMENZA premium range of digital safe lockers designed with robust steel construction, advanced keypad locking, and key override for maximum protection. Available in multiple sizes to safeguard your valuables with style and strength.",
        images: [
            "https://i.pinimg.com/736x/97/06/52/970652e99fc7b6f1802451016ed78511.jpg",
            "https://i.pinimg.com/736x/ad/f6/f3/adf6f3a8672d5e6974623ba82a5dd204.jpg",
            "https://i.pinimg.com/736x/23/77/a7/2377a7cc903d158c683374da5ab6a856.jpg",
        ],
        features: [
            "Pincode : Open & Close with 3-8 digit code",
            "Door : 4mm, Body: 2mm",
            "Reset button : Change the code easily with reset button",
            "Multiple Size Options",
            "Colour : Available in two colour",
            "Override key : Mechanical override key for emergency use",
            "Indicator : 3 indicator lights (green, red and yellow), indicate open, low battery and warning",
            "Interior : Includes protective floor carpet",
            "Fixing : 8-Pre drilled holes at the bottom and back (fixings included)",
            "Bolt : One-way locking bolts(2 bolts with Φ 20mm)",
        ],
        productDetails: [
            {
                title: "Secure X: 20L-MatteBlack",
                image: "https://i.pinimg.com/736x/22/36/19/223619dc2f0e70764b41c9da5c70bfe5.jpg",
                specs: [
                    "(DxWxH): 25 x 35 x 25cm",
                    "Weight(approx): 11.9 kg",
                    "Material: Heavy-duty Steel",
                    "Lock Type: Digital Keypad",
                ],
            },
            {
                title: "Secure X: 20L-MatteGrey",
                image: "https://i.pinimg.com/736x/a8/4b/3e/a84b3e1e0a52ba6d75e31b14e88a06f7.jpg",
                specs: [
                    "(DxWxH): 25 x 35 x 25cm",
                    "Weight(approx): 11.9 kg",
                    "Material: Heavy-duty Steel",
                    "Lock Type: Digital keypad",
                ],
            },
            {
                title: "Secure X: 48L-MatteBlack",
                image: "https://i.pinimg.com/736x/d2/8c/be/d28cbe5137058a687ac82760a8b0843b.jpg",
                specs: [
                    "(DxWxH): 35 x 35 x 42cm",
                    "Weight(approx): 19.4 kg",
                    "Material: Heavy-duty Steel",
                    "Lock Type: Digital Keypad",
                ],
            },
            {
                title: "Secure X: 48L-MatteGrey",
                image: "https://i.pinimg.com/736x/62/e0/0d/62e00d3025aa43e3150aaadcc86c1d3a.jpg",
                specs: [
                    "(DxWxH): 35 x 35 x 42cm",
                    "Weight(approx): 19.4 kg",
                    "Material: Heavy-duty Steel",
                    "Lock Type: Digital Keypad",
                ],
            },
            {
                title: "Secure X: 55L-MatteBlack",
                image: "https://i.pinimg.com/736x/23/77/a7/2377a7cc903d158c683374da5ab6a856.jpg",
                specs: [
                    "(DxWxH): 33 x 35 x 50cm",
                    "Weight(approx): 21 kg",
                    "Material: Heavy-duty Steel",
                    "Lock Type: Digital Keypad",
                ],
            },
            {
                title: "Secure X: 55L-MatteGrey",
                image: "https://i.pinimg.com/736x/17/b3/d0/17b3d070a541925ad80d7cc8aad63f6f.jpg",
                specs: [
                    "(DxWxH): 33 x 35 x 50cm",
                    "Weight(approx): 21 kg",
                    "Material: Heavy-duty Steel",
                    "Lock Type: Digital Keypad",
                ],
            },
        ],
    },
    "Secure ECO": {
        name: "Secure ECO",
        description:
            "LUMENZA premium range of digital safe lockers designed with robust steel construction, advanced keypad locking, and key override for maximum protection. Available in multiple sizes to safeguard your valuables with style and strength.",
        images: [
            "https://i.pinimg.com/736x/a8/cb/55/a8cb550207666bf46490a4e56938e895.jpg",
            "https://i.pinimg.com/736x/aa/3f/09/aa3f09fbe27bf57b152a8d6343442286.jpg",
        ],
        features: [
            "Digital Lock",
            "Door : 3mm, Body: 1.5mm",
            "Compact Design",
            "Multiple Sizes",
            "Fire Resistant",
            "Strong Hinges",
            "Key Override",
            "Anti-Theft Bolts",
            "Battery Operated",
            "Durable Finish",
        ],
        productDetails: [
            {
                title: "Secure ECO: 9L-MatteBlack",
                image: "https://i.pinimg.com/736x/aa/3f/09/aa3f09fbe27bf57b152a8d6343442286.jpg",
                specs: [
                    "(DxWxH): 7.87 x 13.78 x 7.87cm",
                    "Weight(approx): 5.9 kg",
                    "Capacity (Ltr):9.2",
                    "Material: Heavy-duty Steel",
                    "Lock Type: Digital Keypad",
                ],
            },
            {
                title: "Secure ECO: 26L-Black",
                image: "https://i.pinimg.com/736x/aa/3f/09/aa3f09fbe27bf57b152a8d6343442286.jpg",
                specs: [
                    "(DxWxH): 14.96 x 16.93 x 7.87cm",
                    "Weight(approx): 10.7 kg",
                    "Capacity (Ltr): 26.4",
                    "Material: Heavy-duty Steel",
                    "Lock Type: Digital keypad",
                ],
            },
            {
                title: "Secure ECO: 34L-Black",
                image: "https://i.pinimg.com/736x/aa/3f/09/aa3f09fbe27bf57b152a8d6343442286.jpg",
                specs: [
                    "(DxWxH): 14.76 x 17.91 x 9.84cm",
                    "Weight(approx): 12.4 kg",
                    "Capacity (Ltr): 34.94",
                    "Material: Heavy-duty Steel",
                    "Lock Type: Digital Keypad",
                ],
            },
        ],
    },
    "Mortise": {
        name: "Mortise",
        details: [
            {
                img: "https://i.pinimg.com/736x/ff/6c/1f/ff6c1fce0616e237c733c8cd3edc9909.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3101</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin Finish</li>
                            <li>B.Antik Finish</li>
                            <li>Z.Black Finish</li>
                            <li>BL Satin Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/6e/eb/4a/6eeb4a72e94f1adc55416a2479e9-e2c3.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3102</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin Finish</li>
                            <li>B.Antik Finish</li>
                            <li>Z.Black Finish</li>
                            <li>BL Satin Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/44/47/d5/4447d5bc8d8119d0f8d836745a10ef78.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3103</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-1 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>B.Antik + BL Finish</li>
                            <li>Z.Black + Coca Finish</li>
                            <li>BL Satin + BL Nickel Finish</li>
                            <li>PVD RG + BL Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/ba/91/34/ba913428bff40c7cc2e0e90d7b59c702.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3104</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>BL + GL Finish</li>
                            <li>Antik + GL Finish</li>
                            <li>BL Satin + BL Nickel Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/c2/b8/6d/c2b86d17e5d38a3584a635fd7af9ce21.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3105</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>Antik + BL Finish</li>
                            <li>PVD RG + BL Finish</li>
                            <li>PVD GL + BL Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/73/fd/e1/73fde11da192c3eb1d1489b4b6a16d78.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3106</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>PVD GL + BL Finish</li>
                            <li>BL + BL Finish</li>
                            <li>PVD RG + BL Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/57/82/7f/57827f0568fd5820024f192b804b718b.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3111</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>B.Antik + Z.Black Finish</li>
                            <li>PVD Gold + Z.Black Finish</li>
                            <li>BL Satin + BL Nickel Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/29/1e/b5/291eb55cfb401276bae74c19a57c9961.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3112</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>B.Antik + PVD Gold Finish</li>
                            <li>PVD Gold + Z.Black Finish</li>
                            <li>BL Satin + BL Nickel Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/76/dc/e7/76dce7d2c1848f7ce875408a9dc5b2c8.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3113</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin Finish</li>
                            <li>B.Antik Finish</li>
                            <li>Z.Black Finish</li>
                            <li>BL Satin Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/89/79/4c/89794c54efd6e2e5dcac08c7f97fc0f9.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3114</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>BL + BL Finish</li>
                            <li>Coca + BL Finish</li>
                            <li>BL + PVD GL Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/49/f8/8a/49f88a2caf420f8adb5d6f28242dfd6a.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3115</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>BL + RG Finish</li>
                            <li>Coca + Coca Finish</li>
                            <li>BL Satin + BL Nickel Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/9d/97/59/9d9759a2db5f8fa8d4314780b38c4b17.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3116</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin Finish</li>
                            <li>B.Satin Matt Finish</li>
                            <li>Z.Black Finish</li>
                            <li>PVD R.Gold Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/b5/7f/6e/b57f6e5f2f3a3d5ce77cb9c1b8d15784.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3121</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin Finish</li>
                            <li>B.Antik Finish</li>
                            <li>Z.Black Finish</li>
                            <li>BL Satin Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/ef/28/49/ef28493098503b9dc643c5e717fd1325.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3122</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>BL Satin + BL Nickel Finish</li>
                            <li>PVD Gold + Z.Black Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/8a/f3/b9/8af3b90b5b9d7aafc1a8de7096b97d86.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3123</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin Finish</li>
                            <li>B.Antik Finish</li>
                            <li>Z.Black Finish</li>
                            <li>BL Satin Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/4d/0c/d1/4d0cd1b52fc50a92b9202703b700ca02.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3124</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>BL + PVD GL Finish</li>
                            <li>Rembo + BL Satin Finish</li>
                            <li>Coca + Coca Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/e8/e9/55/e8e9552eff617b10713b47378349461d.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3125</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>Coca + BL Finish</li>
                            <li>Gold + BL Finish</li>
                            <li>BL + BL Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/4d/ae/0b/4dae0b9d09968a01a49b63211e78e49e.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3126</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>Coca + BL Finish</li>
                            <li>BL + BL Finish</li>
                            <li>PVD Gold + Antik Finish</li>
                            <li>BL Satin + BL Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/6a/a2/4a/6aa24ab31736353996cfd181ed7d640a.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3131</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>Coca + Black Finish</li>
                            <li> GL + BL Finish</li>
                            <li>BL Satin + GL Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/53/86/24/5386242b9a2729e7b5259669d05002c4.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3132</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>Antik + Black Finish</li>
                            <li>BL Satin + Coca Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/c3/f9/2d/c3f92d39bdc46442de58766ec004cd6a.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3133</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>Coca + Black Finish</li>
                            <li>Antik + BL Finish</li>
                            <li>BL + BL Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/66/7b/9a/667b9a6c2813304c4e938602fa0a65ed.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3134</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>Coca + Black Finish</li>
                            <li>PVD GL + BL Finish</li>
                            <li>BL + BL Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/e1/46/aa/e146aa101dcb45b59fd1ab772f0e070b.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3135</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>PVD GL + Black Finish</li>
                            <li>BL + PVD RG Finish</li>
                            <li>BL Satin + BL Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/85/d2/b6/85d2b6e8ddab9ca36d6c33764af280d4.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LM - 3136</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>Satin + CP Finish</li>
                            <li>PVD RG + Black Finish</li>
                            <li>BL + PVD GL Finish</li>
                            <li>BL Satin + Coca Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/cb/dd/b4/cbddb421e5ffefd5859f8c62b7459de6.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LOCKBODY 45X45</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>S.S. MATT Finish</li>
                            <li>B. ANTIK Finish</li>
                            <li>Z BLACK Finish</li>
                            <li>BL SATIN Finish</li>
                            <li>PVD GL Finish</li>
                            <li>PVD RG Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/fc/7a/42/fc7a4246426601ed91fffd1fd4813931.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">LOCKBODY 45X85</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>S.S. MATT Finish</li>
                            <li>B. ANTIK Finish</li>
                            <li>Z BLACK Finish</li>
                            <li>BL SATIN Finish</li>
                            <li>PVD GL Finish</li>
                            <li>PVD RG Finish</li>
                        </ul>
                    </>
                ),
            },
            {
                img: "https://i.pinimg.com/736x/a8/d7/a5/a8d7a517f73b18aec13c16b48b3f78f6.jpg",
                description: (
                    <>
                        <h3 className="font-semibold text-center text-xl">CYLINDER</h3>
                        <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 text-sm">
                            <li>S.S. MATT Finish</li>
                            <li>B. ANTIK Finish</li>
                            <li>Z BLACK Finish</li>
                            <li>BL SATIN Finish</li>
                            <li>PVD GL Finish</li>
                            <li>CYLINDER SIZES(mm) - 60,70,80,90</li>
                        </ul>
                    </>
                ),
            },
        ],
    },
    "Door Closer": {
        name: "Door Closer",
        description:
            "LUMENZA provides High-quality door closers with smooth operation and robust design. Available in multiple finishes.",
        images: [
            "https://i.pinimg.com/736x/2a/8b/78/2a8b787210cb5f27fc5eba008538ab60.jpg",
            "https://i.pinimg.com/736x/5f/53/e0/5f53e07e9ec563358c7a444670af04a7.jpg",
        ],
        features: [
            "Smooth Closing Action",
            "Adjustable Speed",
            "Durable Steel Build",
            "Sleek Design",
            "Capacity - 60 kg",
            "Door width - 950 mm",
        ],
        finishes: ["Satin", "Gold", "Black"],
    },
    //... (rest of the data)
};


// ==================== Component ====================
const ProductSubDetailPage = () => {
    const navigate = useNavigate();
    const [currentImageIdx, setCurrentImageIdx] = useState(0);
    const { subProductSlug } = useParams();
    const product = allSubProducts[decodeURIComponent(subProductSlug)];

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center text-black bg-gray-100 p-4">
                <p className="text-2xl font-semibold mb-6">Product not found.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 bg-red-800 text-white rounded-lg hover:bg-black transition-colors duration-300"
                >
                    Go Back
                </button>
            </div>
        );
    }

    // LAYOUT 1: For products with a main image gallery
    if (product.images) {
        return (
            <main className="min-h-screen bg-gray-50 text-black pt-28 lg:pt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                        className="mb-8 w-12 h-12 flex items-center justify-center bg-white text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-300 shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>

                    <section className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Image Gallery Section */}
                        <div className="flex flex-col items-center w-full lg:w-2/5 lg:sticky top-28 self-start">
                            <div className="w-full aspect-1 rounded-lg overflow-hidden shadow-lg mb-4 border border-gray-200">
                                <img
                                    src={product.images[currentImageIdx]}
                                    alt={`${product.name} variant ${currentImageIdx + 1}`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="flex gap-3 w-full overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIdx(idx)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-300 ${idx === currentImageIdx ? "border-red-600 scale-110" : "border-transparent hover:border-gray-400"}`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} thumbnail ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info Section */}
                        <div className="w-full lg:w-3/5">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                                {product.name}
                            </h1>
                            <div className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
                                {product.description}
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 border-b pb-2">Features</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-800 list-disc list-inside mb-8">
                                {product.features && product.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>

                            {product.productDetails && <ProductVariants product={product} />}

                            {/* STYLED FINISHES LIST */}
                            {product.finishes && (
                                <>
                                    <h2 className="text-2xl sm:text-3xl font-semibold mb-4 mt-8 border-b pb-2">Finishes</h2>
                                    <div className="space-y-4">
                                        {product.finishes.map((finish, idx) => (
                                            <div key={idx} className="flex items-center">
                                                <span className="w-4 h-2 bg-gray-800 rounded-full mr-4 flex-shrink-0"></span>
                                                <span className="text-gray-800">{finish}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        );
    }

    // LAYOUT 2: For products with a 'details' array (grid layout)
    else if (product.details) {
        return (
            <main className="min-h-screen bg-gray-50 text-black pt-28 lg:pt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <button
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                        className="mb-8 w-12 h-12 flex items-center justify-center bg-white text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-300 shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 text-center">
                        {product.name}
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                        {product.details.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <div className="aspect-1 w-full overflow-hidden">
                                    <img
                                        src={item.img}
                                        alt={`${product.name} detail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4 flex-grow flex flex-col items-center justify-center">
                                    {item.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    // Fallback for any other data structure
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-4 text-gray-700">Product data is available, but a layout has not been configured.</p>
            <button
                onClick={() => navigate(-1)}
                className="mt-6 px-6 py-3 bg-red-800 text-white rounded-lg hover:bg-black transition-colors duration-300"
            >
                Go Back
            </button>
        </div>
    );
};

export default ProductSubDetailPage;