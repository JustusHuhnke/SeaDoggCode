import config, {logConfig} from "_config";
import UserModel from "_server/db/models/User";
import {ISocket, ISocketServer} from "_server/socket/interface";
import * as pino from "pino";
import {initStraem} from "./stream";

const nodemailer = require("nodemailer");
const log = pino({...logConfig, name: "Socket Stream"}, config.pretty);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "connect@seadogg.com",
        pass: "Craveseadogg",
    },
    debug: true,
}, {
    from: "SeaDogg Crew <connect@seadogg.com>",
    headers: {
        "X-Laziness-level": 1000,
    },
});

const inviteHtml = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=device-width"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <title></title> <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"> <style type="text/css" id="media-query"> body{margin: 0; padding: 0;}table, tr, td{vertical-align: top; border-collapse: collapse;}.ie-browser table, .mso-container table{table-layout: fixed;}*{line-height: inherit;}a[x-apple-data-detectors=true]{color: inherit !important; text-decoration: none !important;}[owa] .img-container div, [owa] .img-container button{display: block !important;}[owa] .fullwidth button{width: 100% !important;}[owa] .block-grid .col{display: table-cell; float: none !important; vertical-align: top;}.ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid{width: 500px !important;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%;}.ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4{width: 164px !important;}.ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8{width: 328px !important;}.ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col{width: 250px !important;}.ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col{width: 166px !important;}.ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col{width: 125px !important;}.ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col{width: 100px !important;}.ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col{width: 83px !important;}.ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col{width: 71px !important;}.ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col{width: 62px !important;}.ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col{width: 55px !important;}.ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col{width: 50px !important;}.ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col{width: 45px !important;}.ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col{width: 41px !important;}@media only screen and (min-width: 520px){.block-grid{width: 500px !important;}.block-grid .col{vertical-align: top;}.block-grid .col.num12{width: 500px !important;}.block-grid.mixed-two-up .col.num4{width: 164px !important;}.block-grid.mixed-two-up .col.num8{width: 328px !important;}.block-grid.two-up .col{width: 250px !important;}.block-grid.three-up .col{width: 166px !important;}.block-grid.four-up .col{width: 125px !important;}.block-grid.five-up .col{width: 100px !important;}.block-grid.six-up .col{width: 83px !important;}.block-grid.seven-up .col{width: 71px !important;}.block-grid.eight-up .col{width: 62px !important;}.block-grid.nine-up .col{width: 55px !important;}.block-grid.ten-up .col{width: 50px !important;}.block-grid.eleven-up .col{width: 45px !important;}.block-grid.twelve-up .col{width: 41px !important;}}@media (max-width: 520px){.block-grid, .col{min-width: 320px !important; max-width: 100% !important; display: block !important;}.block-grid{width: calc(100% - 40px) !important;}.col{width: 100% !important;}.col > div{margin: 0 auto;}img.fullwidth{max-width: 100% !important;}}</style></head><body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #FFFFFF"> <style type="text/css" id="media-query-bodytag"> @media (max-width: 520px){.block-grid{min-width: 320px!important; max-width: 100%!important; width: 100%!important; display: block!important;}.col{min-width: 320px!important; max-width: 100%!important; width: 100%!important; display: block!important;}.col > div{margin: 0 auto;}img.fullwidth{max-width: 100%!important;}}</style> <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #FFFFFF;width: 100%"><tbody><tr style="vertical-align: top"><td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"> <div style="background-color:transparent;"> <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid "> <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"> <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;"> <div style="background-color: transparent; width: 100% !important;"> <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <div align="center" class="img-container center fullwidth" style="padding-right: 10px; padding-left: 10px;"><div style="line-height:10px;font-size:1px">&#160;</div><img class="center fullwidth" align="center" border="0" src="https://seadogg.com/images/logo_big.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 480px" width="480"><div style="line-height:10px;font-size:1px">&#160;</div></div></div></div></div></div></div></div><div style="background-color:transparent;"> <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid "> <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"> <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;"> <div style="background-color: transparent; width: 100% !important;"> <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <div style="color:#555555;line-height:120%;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; padding-right: 15px; padding-left: 15px; padding-top: 15px; padding-bottom: 15px;"><div style="font-size:12px;line-height:14px;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;color:#555555;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 24px; line-height: 28px;"><strong><span style="line-height: 28px; font-size: 24px;"><span style="line-height: 28px; font-size: 24px;" id="_mce_caret" data-mce-bogus="true"><span style="line-height: 28px; font-size: 24px;">﻿</span></span>Welcome Aboard!</span></strong></span></p></div></div></div></div></div></div></div></div><div style="background-color:transparent;"> <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid "> <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"> <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;"> <div style="background-color: transparent; width: 100% !important;"> <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <div style="color:#555555;line-height:120%;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; padding-right: 15px; padding-left: 15px; padding-top: 15px; padding-bottom: 15px;"><div style="font-size:12px;line-height:14px;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;color:#555555;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px">&#160;Thank you for subscribing to SeaDogg. Through our newsletter you will receive updates about our launch in February. We can’t wait to have you be a part of our extended crew. We are here to provide each individual with the best possible user experience. If you’d like to support SeaDogg you can donate to our fundraiser on Kickstarter starting on October 14th.</p><p style="margin: 0;font-size: 14px;line-height: 17px">&#160;<br></p></div></div><div style="color:#555555;line-height:120%;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; padding-right: 15px; padding-left: 15px; padding-top: 15px; padding-bottom: 15px;"><div style="font-size:12px;line-height:14px;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;color:#555555;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px">Want to more about your user type? Contact our team at <a style="color:#0068A5;text-decoration: underline;" title="connect@seadogg.com" href="mailto:connect@seadogg.com">connect@seadogg.com</a>.</p></div></div><div style="color:#555555;line-height:120%;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; padding-right: 15px; padding-left: 15px; padding-top: 15px; padding-bottom: 15px;"><div style="font-size:12px;line-height:14px;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;color:#555555;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 14px"><span style="font-size: 14px; line-height: 16px;">Sincerely,</span></p><p style="margin: 0;font-size: 12px;line-height: 14px"><span style="font-size: 14px; line-height: 16px;"><em><span style="line-height: 16px; font-size: 14px;">The SeaDogg Crew</span> </em></span></p></div></div></div></div></div></div></div></div><div style="background-color:#171c3f;"> <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid "> <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"> <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;"> <div style="background-color: transparent; width: 100% !important;"> <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 0px; padding-left: 0px;"> <div style="color:#FFFFFF;line-height:120%;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><div style="font-size:12px;line-height:14px;color:#FFFFFF;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center"><span style="font-size: 22px; line-height: 26px;"><strong>Want to know more and can’t wait?</strong></span></p></div></div><div style="color:#FFFFFF;line-height:120%;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><div style="font-size:12px;line-height:14px;color:#FFFFFF;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px">Contact our team at <a style="color:#FFFFFF;text-decoration: underline;" title="connect@seadogg.com" href="mailto:connect@seadogg.com">connect@seadogg.com</a>.</p></div></div><div style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> <div align="center"><div style="border-top: 1px solid #BBBBBB; width:100%; line-height:1px; height:1px; font-size:1px;">&#160;</div></div></div><div style="color:#FFFFFF;line-height:120%;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><div style="font-size:12px;line-height:14px;color:#FFFFFF;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><em>Copyright © 2017 SeaDogg. All rights reserved.</em><br></p></div></div><div style="color:#FFFFFF;line-height:120%;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><div style="font-size:12px;line-height:14px;color:#FFFFFF;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 12px; line-height: 14px;">You are now part of the SeaDogg community. We will keep sending updates through our newsletter and social media pages. I'm a new Text block ready for your content.</span></p></div></div></div></div></div></div></div></div></td></tr></tbody> </table> </body></html>`;

export const socketInit = (io: ISocketServer) => {
    io.of("/socket_user").on("connection", (socket: ISocket) => {
        // console.log("socket_user", socket);
        socket.on("saveEarly", async ({email, name, phone, checkList}: any, cb) => {
            try {
                const user = new UserModel({
                    email,
                    firstName: name,
                    phoneNumber: phone,
                    checkList,
                });

                await user.save();

                const mailOptions = {
                    from: "SeaDogg Crew <connect@seadogg.com>",
                    to: `${name} <${email}>`,
                    subject: "Welcome aboard!",
                    html: inviteHtml,
                };

                transporter.sendMail(mailOptions, (err: any, info: any) => {
                    if (err) {
                        log.error("Email send error: ", err);
                    } else {
                        log.info("Email send ok: ", info);
                    }
                    cb();
                });

            } catch (err) {
                log.error(err);
                cb();
            }
        });
    });

    io.of("/socket_transfer").on("connection", (socket: ISocket) => {
        initStraem(socket);
    });
};
