import json
import os
import smtplib
from email.mime.text import MIMEText
from email.header import Header
from email.utils import formataddr


def handler(event: dict, context) -> dict:
    """Принимает обращение с сайта Совета НКО и отправляет его письмом на почту Совета"""
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    name = str(body.get('name', '')).strip()
    org = str(body.get('org', '')).strip()
    email = str(body.get('email', '')).strip()
    message = str(body.get('message', '')).strip()

    if len(name) < 2 or '@' not in email or len(message) < 10:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Проверьте заполнение формы'}, ensure_ascii=False),
        }

    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    recipient = os.environ.get('CONTACT_RECIPIENT', 'info@mental-health-russia.ru')

    if not smtp_host or not smtp_user or not smtp_password:
        return {
            'statusCode': 500,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Почта не настроена'}, ensure_ascii=False),
        }

    text = (
        f'Новое обращение с сайта Совета НКО при РОП\n\n'
        f'Имя: {name}\n'
        f'Организация: {org or "не указана"}\n'
        f'Электронная почта: {email}\n\n'
        f'Сообщение:\n{message}\n'
    )

    msg = MIMEText(text, 'plain', 'utf-8')
    msg['Subject'] = Header(f'Обращение с сайта: {name}', 'utf-8')
    msg['From'] = formataddr((str(Header('Сайт Совета НКО', 'utf-8')), smtp_user))
    msg['To'] = recipient
    msg['Reply-To'] = email

    if smtp_port == 465:
        server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=20)
    else:
        server = smtplib.SMTP(smtp_host, smtp_port, timeout=20)
        server.starttls()

    server.login(smtp_user, smtp_password)
    server.sendmail(smtp_user, [recipient], msg.as_string())
    server.quit()

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True}, ensure_ascii=False),
        'isBase64Encoded': False,
    }
