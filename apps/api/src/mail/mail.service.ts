import { Injectable } from '@nestjs/common';

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class MailService {
  private readonly ses: SESClient;

  constructor() {
    this.ses = new SESClient({
      region: 'eu-west-1',
    });
  }

  sendEmail(email: string) {
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: 'HTML_FORMAT_BODY',
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'TEXT_FORMAT_BODY',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email',
        },
      },
      Source: 'no-reply@ox.nlr.app',
    });

    this.ses.send(command);
  }

  sendRegisterToken(email: string, token: string) {
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data:
              'https://www.ox.nathanrignall.uk/register/complete?token=' +
              token,
          },
          Text: {
            Charset: 'UTF-8',
            Data:
              'https://www.ox.nathanrignall.uk/register/complete?token=' +
              token,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Welcome to Oscar Ox',
        },
      },
      Source: '"Oscar Ox" <no-reply@ox.nlr.app>',
    });

    this.ses.send(command);
  }

  sendLoginToken(email: string, token: string) {
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: 'https://dev.ox.nathanrignall.uk/login/verify?token=' + token,
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'https://dev.ox.nathanrignall.uk/login/verify?token=' + token,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Login Link for Oscar Ox',
        },
      },
      Source: '"Oscar Ox" <no-reply@ox.nlr.app>',
    });

    this.ses.send(command);
  }
}
