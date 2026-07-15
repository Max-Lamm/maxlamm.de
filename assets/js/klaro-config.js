window.klaroConfig = {
  version: 1,
  elementID: 'klaro',
  storageMethod: 'cookie',
  cookieName: 'klaro',
  cookieExpiresAfterDays: 365,
  acceptAll: true,
  mustConsent: false,
  default: false,
  lang: (navigator.language || '').startsWith('de') ? 'de' : 'en',

  translations: {
    de: {
      consentModal: {
        description: 'Hier kannst du einsehen und anpassen, welche externen Dienste wir auf dieser Website einbinden. Du kannst deine Einwilligung jederzeit widerrufen.'
      },
      purposes: {
        media: 'Medien',
        security: 'Sicherheit',
      },
      youtube: {
        description: 'YouTube-Videos werden von Googles Servern geladen. Dabei können Cookies gesetzt werden.'
      },
      vimeo: {
        description: 'Vimeo-Videos werden von Vimeos Servern geladen. Dabei können Cookies gesetzt werden.'
      },
      turnstile: {
        description: 'Schützt das Kontaktformular vor Spam. Dabei wird eine Verbindung zu Cloudflare aufgebaut.'
      },
    },
    en: {
      consentModal: {
        description: 'Here you can see and customize which external services we use on this website. You can revoke your consent at any time.'
      },
      purposes: {
        media: 'Media',
        security: 'Security',
      },
      youtube: {
        description: "YouTube videos are loaded from Google's servers. Cookies may be set in the process."
      },
      vimeo: {
        description: "Vimeo videos are loaded from Vimeo's servers. Cookies may be set in the process."
      },
      turnstile: {
        description: 'Protects the contact form from spam. A connection to Cloudflare is established.'
      },
    }
  },

  services: [
    {
      name: 'turnstile',
      title: 'Cloudflare Turnstile',
      purposes: ['security'],
      required: true,
    },
    {
      name: 'youtube',
      title: 'YouTube',
      purposes: ['media'],
      default: false,
    },
    {
      name: 'vimeo',
      title: 'Vimeo',
      purposes: ['media'],
      default: false,
    },
  ],
};
