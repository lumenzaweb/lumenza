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
<h3 className="font-semibold text-center text-2xl">LM - 3101</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
<li>Satin Finish</li>
<li>B.Antik Finish</li>
<li>Z.Black Finish</li>
<li>BL Satin Finish</li>
</ul>
</>
),
},
{
img: "https://i.pinimg.com/736x/6e/eb/4a/6eeb4a72e94f1adc55416a2479e9e2c3.jpg",
description: (
<>
<h3 className="font-semibold text-center text-2xl">LM - 3102</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3103</h3>
<ul className="list-disc list-inside text-black ml-1 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3104</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3105</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3106</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3111</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3112</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3113</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3114</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3115</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3116</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3121</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3122</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3123</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3124</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3125</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3126</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3131</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3132</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3133</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3134</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3135</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LM - 3136</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LOCKBODY 45X45</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">LOCKBODY 45X85</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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
<h3 className="font-semibold text-center text-2xl">CYLINDER</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
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

// Merged both Door Closer entries into one to remove duplicate key.
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
// Preserve original details array from the first Door Closer block.
details: [
{
img: "https://i.pinimg.com/736x/bb/7e/8b/bb7e8b7e57267e3647ba6324bf91f106.jpg",
description: (
<>
<h3 className="font-semibold text-center text-2xl">LM - 3101</h3>
<ul className="list-disc list-inside text-black ml-2 mt-1">
<li>Satin Finish</li>
<li>B.Antik Finish</li>
<li>Z.Black Finish</li>
<li>BL Satin Finish</li>
</ul>
</>
),
},
],
},

"Wire basket": {
name: "Wire basket",
description:
"LUMENZA wire basket and a pullout are essential kitchen accessories designed for organized storage and efficient space utilization. Both are made of durable wire—often chrome-plated—for strength and corrosion resistance, providing modern convenience and aesthetic appeal.",
images: [
"https://i.pinimg.com/736x/11/ea/87/11ea87b9141ca0545a03ce7ffb0cc290.jpg",
"https://i.pinimg.com/736x/5a/20/26/5a2026d40c37c25f460303697ba21452.jpg",
"https://i.pinimg.com/736x/69/3b/6f/693b6f9856c3627aeb099cbdae8e5b10.jpg",
],
features: [
"Made of high-quality stainless steel or chrome-plated wire for durability and rust resistance.",
"Smooth polished finish with mirror-like shine for attractive look and ease of cleaning.",
"Suitable for kitchen storage, pantry organization, and multipurpose household use.",
"Easy to install, maintain, and clean with just a wipe.",
"Rails and secure sides to prevent items from falling when sliding out.",
"Download PDF for the detailed products catalogue.",
],
},
"Sheet basket": {
name: "Sheet basket",
description:
"LUMENZA sheet basket for the kitchen is typically a flat, sturdy basket made from stainless steel sheet or metal sheet with fine thickness. It is designed for versatile usage such as storing cutlery, utensils, or small kitchen items and can also be used as a pullout basket inside kitchen cabinets for better organization.",
images: [
"https://i.pinimg.com/736x/8b/28/c0/8b28c0f5f6edd45fc7c4b29a99cb03f3.jpg",
"https://i.pinimg.com/736x/d9/78/8c/d9788c5c5a2d401d84899d274c6bb221.jpg",
"https://i.pinimg.com/736x/57/cd/2d/57cd2d853d0f18ab3761c00cce3149e1.jpg",
],
features: [
"Modular design to fit standard kitchen cabinet sizes.",
"Easy access and convenient storage of kitchen utensils, bottles, or cutlery.",
"Suitable for home, hotel, and restaurant kitchen use.",
"Easy to clean, hygienic, and durable against regular kitchen wear.",
"Available in variations like plain sheet baskets, perforated baskets, and multi-tiered pullouts.",
"Download PDF for the detailed products catalogue.",
],
},
"Profile handle": {
name: "Profile handle",
description:
"LUMENZA profile handle is typically made from materials like aluminum, stainless steel, or zinc alloy. Designed to be fitted along the edge of cabinet fronts, it allows for easy grip and operation while maintaining a streamlined, unobtrusive appearance.",
images: [
"https://i.pinimg.com/736x/74/cb/79/74cb794c6fc1688a9f5e7d1266897427.jpg",
"https://i.pinimg.com/736x/82/b3/4c/82b34c9ba5107be979a804e4954218ca.jpg",
"https://i.pinimg.com/736x/77/79/c7/7779c75b55aab3badff5a165ce526073.jpg",
],
features: [
"Minimalist Design: Profile handles offer a contemporary, handle-less aesthetic well-suited for modern kitchens and furniture.",
"Easy Installation: Most profile handles are designed for surface mounting or edge fitting, making them simple to install.",
"Ergonomic Grip: The recessed or angled shape allows for comfortable opening and closing of cabinets.",
"Hygienic Surface: Their simple shape makes cleaning easy, minimizing dust and grime accumulation.",
"Available in multiple sizes and finishes.",
"Download PDF for the detailed products catalogue.",
],
},
"Cabinet handle": {
name: "Cabinet handle",
description:
"Lumenza provides a diverse range of cabinet handles that suit various décor styles, from sleek minimalist bars to more decorative and geometric designs. These handles are crafted to provide a sturdy grip and elevate the visual appeal of cabinets while ensuring easy operation.",
images: [
"https://i.pinimg.com/736x/3b/1b/c1/3b1bc1ad75a6f5fa5d7ebc49f6aa9171.jpg",
"https://i.pinimg.com/736x/e1/8d/1c/e18d1c5e683cc3fea1938976d70ccd79.jpg",
"https://i.pinimg.com/736x/e2/87/ee/e287ee3a55788039abd5c7823f62ce00.jpg",
],
features: [
"Variety of Designs: Available as bar handles, recessed pulls, and integrated pulls, catering to modern, classic, and transitional decor preferences.",
"Multiple Finishes: Finishes such as chrome, matte black, brushed nickel, copper, gold, and dual-tone styles ensure aesthetic versatility to complement cabinetry and hardware.",
"Size Choices: Handles are offered in different lengths and thicknesses to fit various cabinet sizes and functions, from small drawers to large doors.",
"Easy Installation: Most cabinet handles feature standard screw spacings and mounting styles for straightforward installation and replacement.",
"Functional Durability: High-quality handles are resistant to wear, scratches, and tarnishing, supporting long-term performance.",
"Download PDF for the detailed products catalogue.",
],
},
"Wardrobe Lock": {
name: "Wardrobe Lock",
description:
"Lumenza sources high-quality wardrobe locks known for their sturdy construction, smooth locking mechanism, and aesthetic appeal. These locks are designed to fit various wardrobe types and ensure enhanced security alongside elegant finishes. These locks are widely used in office furniture, residential storage cabinets, and retail fixtures to prevent unauthorized access.",
images: ["https://i.pinimg.com/736x/1f/b9/83/1fb983f1b894c1714751c60d47f49c82.jpg"],
features: [
"Secure Key Operation: Provides reliable access control via a uniquely cut key and cylinder mechanism, reducing unauthorized opening.",
"Simple Installation: Mounts easily with screws and a single hole in most cabinet or drawer faces, accommodating various thicknesses.",
"Multiple Cam Styles: Available with straight or offset cams for compatibility with different cabinet designs.",
"Versatile Applications: Suitable for wood, metal, or plastic cabinets and frequently used in office, kitchen, and retail environments.",
"Spare Keys Provided: Usually supplied with at least two keys for convenience and backup access.",
"Download PDF for the detailed products catalogue.",
],
},
"Knob": {
name: "Knob",
description:
"Lumenza company recognized for its premium, design-forward cabinet knobs that combine functionality with modern aesthetics. Our knob collection offers a refined touch for contemporary and classic interiors, ensuring quality and versatility for every space.",
images: [
"https://i.pinimg.com/736x/43/0f/19/430f199700551bdfc39c4ec1a0771016.jpg",
"https://i.pinimg.com/736x/01/ab/d6/01abd6678c77d43200a8ff869b9f2822.jpg",
"https://i.pinimg.com/736x/44/1e/09/441e09a0cfa6cc5f6d7f87b47b3302a3.jpg",
],
features: [
"Designer Styles: Lumenza's knob portfolio includes geometric, minimalist, and decorative designs, available in round, rectangular, and artistic shapes.",
"Wide Range of Finishes: Options include chrome, gold, matte black, copper, and multi-tone combos, ensuring compatibility with any cabinetry style",
"Ergonomic Handling: Designs feature smooth edges and comfortable contours for easy, everyday use.",
"Easy Installation: Each knob is engineered for quick installation, with standard fittings that are compatible with most cabinet types.",
"Customization: Lumenza can offer bespoke designs and finishes to meet specific project needs, bringing unique character to living or working spaces.",
"Download PDF for the detailed products catalogue.",
],
},
"Silicone": {
name: "Silicone",
description: 
<li>
<strong>GP300</strong> is one part acetic cure silicone sealant. A strong, fast curing, general purpose & is unaffected by rain, sunlight, snow etc. It is formulated with years if experience on a wide range of applications. It is a silicone sealant with high UV & water resistance.
</li>,
images: [
"https://i.pinimg.com/736x/7f/f1/7b/7ff17ba1c6f90e1951735e879e28b434.jpg",
"https://i.pinimg.com/736x/eb/ea/33/ebea3372d29a5132e10c988e3f6bfb2a.jpg",
],
features: [
"GP-300",
"Premium Grade Acetoxy Silicone Sealant",
"Superior Adhesion On Glass",
"Durable Sealing",
"Good Elasticity",
"Excellent UV Resistance",
"For any info fill query form and submit",
],
},
// Add other sub products as needed
};

// ==================== Component ====================
const ProductSubDetailPage = () => {
  const navigate = useNavigate();
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const { subProductSlug } = useParams();
const product = allSubProducts[decodeURIComponent(subProductSlug)];


  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-black bg-gray-100 p-8">
        <p className="text-2xl mb-6">Product not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-3 bg-red-800 text-white rounded-lg hover:bg-black transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  // If product has images (gallery layout)
if (product.images) {
  return (
    <main className="py-20 px-10 min-h-screen bg-gray-50 flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="self-center mt-28 mb-8 px-6 py-3 bg-red-800 text-white rounded-lg hover:bg-black transition shadow-md"
      >
        Back
      </button>

      <section className="flex flex-col md:flex-row flex-1 gap-8 max-w-full overflow-hidden px-4">
        {/* Image Gallery Section */}
        <div className="flex flex-col items-center w-full md:w-1/3 max-w-md mx-auto">
          <div className="w-full aspect-[4/5] rounded-lg overflow-hidden shadow-lg mb-4 border border-gray-300">
            <img
              src={product.images[currentImageIdx]}
              alt={`${product.name} variant ${currentImageIdx + 1}`}
              className="w-full h-full object-contain transition-transform duration-300"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 w-full">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIdx(idx)}
                className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-4 ${
                  idx === currentImageIdx
                    ? "border-white-700"
                    : "border-transparent hover:border-green-400"
                } transition-colors duration-300 focus:outline-none`}
                aria-label={`View variant ${idx + 1}`}
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
        <div className="flex-1 max-w-3xl flex flex-col overflow-auto">
          <h1 className="text-2xl md:text-5xl font-extrabold mb-6 text-black">
            {product.name}
          </h1>
          <p className="text-base md:text-lg text-black mb-8 leading-relaxed">
            {product.description}
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-black">Features</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-black list-disc list-inside">
            {product.features.map((feature, idx) => (
              <li key={idx} className="text-base">
                {feature}
              </li>
            ))}
          </ul>

          {product.finishes && product.finishes.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-black">
                Finishes
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 text-black list-disc list-inside">
                {product.finishes.map((finish, idx) => (
                  <li key={idx} className="text-base">
                    {finish}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* PDF Download Box for ALL products */}
      <section className="mt-16 max-w-4xl mx-auto p-6 bg-red-100 border-2 border-red-700 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4 text-red-900">
          Download Our Product Catalog
        </h2>
        <p className="mb-6 text-red-800">
          Get all product details and specifications in one handy PDF file.
        </p>
        <a
          href="https://1drv.ms/b/c/787E0745D45C1EC6/EfjLRCDiQsFHo_i176e9iTcBKRdVrpzUGYTxI4GdsSqnvQ?e=24JQyW"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full md:inline-block md:w-auto px-6 py-3 bg-red-700 text-white font-bold rounded hover:bg-red-800 transition"
        >
          Download PDF
        </a>
      </section>
    </main>
  );
}

// Fallback
return (
  <div className="min-h-screen flex flex-col justify-center items-center text-black bg-gray-100 p-8">
    <p className="text-2xl mb-6">Product not found.</p>
    <button
      onClick={() => navigate(-1)}
      className="px-5 py-3 bg-red-800 text-white rounded-lg hover:bg-black transition"
    >
      Go Back
    </button>
  </div>
);
}

export default ProductSubDetailPage;
