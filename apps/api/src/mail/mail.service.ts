import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class MailService {
  private readonly ses: SESClient;

  constructor(config: ConfigService) {
    this.ses = new SESClient({
      region: 'eu-west-1',
      credentials: {
        accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY'),
      },
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
      Source: 'sender@mail.ox.nathanrignall.uk',
    });

    this.ses.send(command);
  }

  sendToken(email: string, token: string) {
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: token,
          },
          Text: {
            Charset: 'UTF-8',
            Data: token,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Token Enclosed',
        },
      },
      Source: '"Oscar Ox" <no-reply@mail.ox.nathanrignall.uk>',
    });

    this.ses.send(command);
  }
}
