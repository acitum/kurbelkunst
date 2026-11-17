
import { LanguageSwitcher, useI18n } from '../i18n';

export default function Impressum() {
  const { t } = useI18n();
  return (
    <main className="legal-page">
      <p><a href="/">← {t('Zurück zur Startseite')}</a></p>
      <LanguageSwitcher />
      <h1>{t('Impressum')}</h1>

      <h2>{t('Medieninhaber und Betreiber')}</h2>
      <p>
        {t('[Offizieller Vereinsname]')}
        <br />
        {t('[Straße und Hausnummer]')}
        <br />
        {t('[PLZ] Wien, Österreich')}
      </p>

      <h2>{t('Vereinsinformationen')}</h2>
      <p>
        {t('ZVR-Zahl: [ZVR-Zahl]')}
        <br />
        {t('Vertretungsberechtigte Personen: [Namen]')}
      </p>

      <h2>{t('Kontakt')}</h2>
      <p>
        {t('E-Mail: [Kontaktadresse]')}
      </p>

      <h2>{t('Grundlegende Richtung')}</h2>
      <p>
        {t('Diese Webseite informiert über die Kurbelkunst Winter Games, eine GPS-Art-Radchallenge des Kurbel Kollektiv Wien.')}
      </p>

      <p>
        {t('Die Webseite dient der Information über die Veranstaltung und der Förderung gemeinschaftlicher Fahrradaktivitäten.')}
      </p>
    </main>
  );
}
