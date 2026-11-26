import { LanguageProvider } from '../context/LanguageContext'
import { TERMS_OF_SERVICE, legalPageTitle } from './legalContent'
import { LegalPage } from './LegalPage'

export function TermsPage() {
  return (
    <LanguageProvider pageTitle={legalPageTitle(TERMS_OF_SERVICE)}>
      <LegalPage document={TERMS_OF_SERVICE} />
    </LanguageProvider>
  )
}
