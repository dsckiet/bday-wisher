const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");

// registering font
registerFont("./assets/fonts/text_font.ttf", {
	weight: 600,
	style: "normal",
	family: "text_font"
});

const width = 1920;
const height = 960;

// handler function
module.exports.generateImage = async (name, image, id) => {
	const canvas = createCanvas(width, height);
	const context = canvas.getContext("2d");

	// background image settings
	let bg = await loadImage(
		"https://dsc-portal-static.s3.ap-south-1.amazonaws.com/birthdays/template.png"
	);
	context.drawImage(bg, 0, 0, width, height);

	// general text props for name
	context.fillStyle = "#F4B400";
	context.font = "46px 'text_font'";
	context.fillText(`${name} 🎂`, 895, 315);

	// for image
	let photo = await loadImage(image);
	context.drawImage(photo, 228, 333, 350, 350);

	// store generated buffer
	const buffer = canvas.toBuffer("image/png");
	fs.writeFileSync(`assets/images/wish_${id}.png`, buffer);
};
