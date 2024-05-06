import nodemailer, { TransportOptions } from "nodemailer";
import path from "path";
import fs from "fs";
const hbs = require("handlebars");

const host = process.env.HOST_SMTP;
const port = process.env.PORT_SMTP;
const user = process.env.USER_SMTP;
const password = process.env.PASSWORD_SMTP;

interface ExtendedTransportOptions extends TransportOptions {
  host?: string;
  port?: number;
  auth: {
    user?: number;
    password?: number;
  };
}

const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  auth: {
    user: user,
    pass: password,
  },
} as ExtendedTransportOptions);

async function createEmailPathBase(pathUrl: string, context: any) {
  const templatePath = path.resolve(`./src/resource/mail/${pathUrl}.html`);
  const htmlTemplate = fs.readFileSync(templatePath, "utf-8").toString();
  const template = hbs.compile(htmlTemplate);

  const html = template(context);
  return html;
}

export { transporter, createEmailPathBase };
