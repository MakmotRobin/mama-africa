import { LanguageProvider } from '../context/LanguageContext'
import { PRIVACY_POLICY, legalPageTitle } from './legalContent'
import { LegalPage } from './LegalPage'

export function PrivacyPage() {
  return (
    <LanguageProvider pageTitle={legalPageTitle(PRIVACY_POLICY)}>
      <LegalPage document={PRIVACY_POLICY} />
    </LanguageProvider>
  )
}
