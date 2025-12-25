import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ShieldAlert } from "lucide-react"
import type { Indicators } from "@/lib/scam-analyzer"

interface RiskExplanationProps {
  indicators: Indicators
  riskScore: number
}

export function RiskExplanation({ indicators, riskScore }: RiskExplanationProps) {
  const reasons: string[] = []

  if (indicators.urgencyLanguage) {
    reasons.push("Urgency language detected — pressures you to act without thinking")
  }
  if (indicators.suspiciousKeywords) {
    reasons.push("Suspicious keywords found — common in phishing and scam attempts")
  }
  if (indicators.fakeRewardsOrThreats) {
    reasons.push("Threatening tone or fake rewards detected — manipulation tactics")
  }
  if (indicators.unknownUrl) {
    reasons.push("Unknown or shortened link detected — may hide malicious destinations")
  }
  if (indicators.senderImpersonation) {
    reasons.push("Sender impersonation signs — pretending to be a trusted organization")
  }
  if (indicators.sensitiveDataRequest) {
    reasons.push("Sensitive data request — asking for passwords, OTP, or bank details")
  }
  if (indicators.grammarIssues) {
    reasons.push("Grammar and spelling issues — often indicates non-professional origin")
  }
  if (indicators.domainMismatch) {
    reasons.push("Domain spoofing detected — look-alike or misspelled domain names")
  }
  if (indicators.paymentRequest) {
    reasons.push("Unexpected payment request — requesting money transfers or payments")
  }
  if (indicators.cryptoScam) {
    reasons.push("Crypto/investment scam signals — unrealistic return promises")
  }

  const isHighRisk = riskScore > 60

  return (
    <Card
      className={`border-2 ${isHighRisk ? "border-red-500/50 bg-red-500/5" : "border-amber-500/50 bg-amber-500/5"}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className={`flex items-center gap-2 text-lg ${isHighRisk ? "text-red-600" : "text-amber-600"}`}>
          {isHighRisk ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          Why this is {isHighRisk ? "high" : "medium"} risk
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {reasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span
                className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isHighRisk ? "bg-red-500" : "bg-amber-500"}`}
              />
              <span className="text-foreground">{reason}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
