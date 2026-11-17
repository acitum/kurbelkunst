
import { useI18n } from '../i18n';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <strong>KURBELKUNST</strong>
          <p>{t('Ein Projekt des Kurbel Kollektiv Wien')}</p>
        </div>

        <nav aria-label={t('Rechtliche Informationen')}>
          <a href="/impressum">{t('Impressum')}</a>
          <a href="/datenschutz">{t('Datenschutz')}</a>
        </nav>
      </div>
    </footer>
  );
}
