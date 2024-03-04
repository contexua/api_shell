'use_strict'
const fs = require('fs');
const path = require('path');

class TranslationService {
  constructor() {
    this.translations = {};
    this.loadTranslations();
    console.log(this.translations)
  }

  loadTranslations() {
    const localesPath = path.join(__dirname, '..' , 'locales');
    fs.readdirSync(localesPath).forEach(file => {
      const locale = path.basename(file, '.json');
      const filePath = path.join(localesPath, file);
      try {
        const translations = fs.readFileSync(filePath, 'utf8');
        this.translations[locale] = JSON.parse(translations);
      } catch (error) {
        console.error(`Error loading the translation file for locale ${locale}:`, error);
      }
    });
  }
  translate(key, locale, variables = null) {

    let translation = this.translations[locale] && this.translations[locale][key];
    if (!translation) {
        return key;
    }


    if (variables !== null && typeof variables === 'object') {
        Object.keys(variables).forEach(varKey => {
            const regex = new RegExp(varKey, 'g');
            translation = translation.replace(regex, variables[varKey]);
        });
    }
    return translation;
  }
}

// Export a singleton instance
const translationService = new TranslationService();
module.exports = translationService;
