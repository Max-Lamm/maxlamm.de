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
      },
      youtube: {
        description: 'YouTube-Videos werden von Googles Servern geladen. Dabei können Cookies gesetzt werden.'
      },
      vimeo: {
        description: 'Vimeo-Videos werden von Vimeos Servern geladen. Dabei können Cookies gesetzt werden.'
      },
    },
    en: {
      consentModal: {
        description: 'Here you can see and customize which external services we use on this website. You can revoke your consent at any time.'
      },
      purposes: {
        media: 'Media',
      },
      youtube: {
        description: "YouTube videos are loaded from Google's servers. Cookies may be set in the process."
      },
      vimeo: {
        description: "Vimeo videos are loaded from Vimeo's servers. Cookies may be set in the process."
      },
    }
  },

  services: [
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
