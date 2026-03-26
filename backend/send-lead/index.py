import json
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта и отправляет письмо на почту владельца."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name    = body.get("name", "").strip()
    phone   = body.get("phone", "").strip()
    subject_type = body.get("subject", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"error": "Имя и телефон обязательны"}),
        }

    smtp_user = "akula-business@yandex.ru"
    smtp_pass = os.environ["SMTP_PASSWORD"]

    html_body = f"""
    <html><body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
      <div style="max-width:520px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">
        <div style="background:linear-gradient(135deg,#7c3aed,#2563eb);padding:24px 28px;">
          <h2 style="color:#fff;margin:0;font-size:22px;">🦈 Новая заявка с сайта</h2>
        </div>
        <div style="padding:24px 28px;">
          <table style="width:100%;border-collapse:collapse;font-size:15px;">
            <tr><td style="padding:8px 0;color:#888;width:120px">Имя:</td><td style="font-weight:700;color:#111">{name}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Телефон:</td><td style="font-weight:700;color:#111">{phone}</td></tr>
            {"<tr><td style='padding:8px 0;color:#888'>Что открыть:</td><td style='font-weight:700;color:#111'>" + subject_type + "</td></tr>" if subject_type else ""}
            {"<tr><td style='padding:8px 0;color:#888;vertical-align:top'>Вопрос:</td><td style='color:#333'>" + message + "</td></tr>" if message else ""}
          </table>
        </div>
        <div style="padding:14px 28px;background:#f9f6ff;font-size:12px;color:#aaa">
          Акула Бизнеса · akula-business.ru
        </div>
      </div>
    </body></html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"🦈 Заявка от {name} — {phone}"
    msg["From"] = smtp_user
    msg["To"] = smtp_user
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, smtp_user, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {**cors_headers, "Content-Type": "application/json"},
        "body": json.dumps({"ok": True}),
    }
