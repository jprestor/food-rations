"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    email: {
        config: {
            provider: 'mailgun',
            providerOptions: {
                apiKey: env('MAILGUN_API_KEY'),
                domain: env('MAILGUN_DOMAIN'), //Required if you have an account with multiple domains
                // host: env("smtp.mailgun.org", "api.mailgun.net"), //Optional. If domain region is Europe use 'api.eu.mailgun.net'
            },
            settings: {
                defaultFrom: `no-reply@${env('MAILGUN_DOMAIN')}`,
                defaultReplyTo: `no-reply@${env('MAILGUN_DOMAIN')}`,
            },
        },
    },
    transformer: {
        enabled: true,
        config: {
            responseTransforms: {
                removeAttributesKey: true,
                removeDataKey: true,
            },
        },
    },
    'duplicate-button': true,
    placeholder: {
        enabled: true,
        config: {
            size: 10,
        },
    },
});
//# sourceMappingURL=plugins.js.map