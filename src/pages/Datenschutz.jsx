
import { LanguageSwitcher, useI18n } from '../i18n';

export default function Datenschutz() {
  const { t } = useI18n();
  return (
    <main className="legal-page">
      <p><a href="/">← {t('Zurück zur Startseite')}</a></p>
      <LanguageSwitcher />
      <h1>{t('Datenschutzerklärung')}</h1>

      <p>
        {t('Hier wird die Datenschutzerklärung für die Kurbelkunst Winter Games eingefügt.')}
      </p>

      <p>
        {t('Sie muss unter anderem erläutern, welche personenbezogenen Daten verarbeitet werden, zu welchen Zwecken und auf welcher Rechtsgrundlage.')}
      </p>

      <p>
        {t('Insbesondere sind Hosting, Kontaktmöglichkeiten, etwaige Teilnehmerregistrierungen, GPS-Uploads und das Leaderboard zu berücksichtigen.')}
      </p>
    </main>
  );
}
