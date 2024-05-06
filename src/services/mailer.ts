import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
const hbs = require("handlebars");

const transporter = nodemailer.createTransport({
  host: process.env.HOST_SMTP,
  port: process.env.PORT_SMTP,
  auth: {
    user: process.env.USER_SMTP,
    pass: process.env.PASSWORD_SMTP,
  },
});

async function createEmailPathBase(pathUrl: string, context: any) {
  const templatePath = path.resolve(`./src/resource/mail/${pathUrl}.html`);
  const htmlTemplate = fs.readFileSync(templatePath, "utf-8").toString();
  const template = hbs.compile(htmlTemplate);

  const html = template(context);
  return html;
}

export { transporter, createEmailPathBase };
