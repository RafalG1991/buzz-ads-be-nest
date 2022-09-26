import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export = {
  transport: 'smtp://admin:pass@localhost:2500',
  defaults: {
    from: 'admin@test.com',
  },
  template: {
    dir: __dirname + '/templates/email',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
