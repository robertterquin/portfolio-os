import './IssuerBadge.css';

const issuerBadges: Record<string, string> = {
  Certiport: 'ITS',
  'Oracle Academy': 'OA',
  CodeChum: 'CC',
  'Cisco Networking Academy': 'NA',
  'AWS Academy': 'AWS',
  Coursera: 'CO',
  Google: 'G',
  Microsoft: 'MS',
  'Microsoft Learn': 'MS',
  Udemy: 'U',
};

/** A round badge with the issuer's initials, e.g. ITS for Certiport. */
export function IssuerBadge({ issuer }: { issuer: string }) {
  const known = issuerBadges[issuer];
  const text =
    known ??
    issuer
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  return (
    <span className="issuer-badge" aria-hidden="true">
      {text}
    </span>
  );
}
