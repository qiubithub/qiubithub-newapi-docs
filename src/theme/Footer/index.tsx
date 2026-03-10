import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

type FooterLinkItem = {
  label: string;
  to?: string;
  href?: string;
};

type FooterLinkSection = {
  title: string;
  items?: FooterLinkItem[];
};

type FooterMethod = {
  type?: 'wechat' | 'email';
  label: string;
  value: string;
  href?: string;
};

type FooterCredit = {
  label: string;
  name: string;
  href?: string;
};

type FooterData = {
  description?: string;
  accentText?: string;
  badges?: string[];
  contactTitle?: string;
  contactDescription?: string;
  contactMethods?: FooterMethod[];
  metaItems?: string[];
  credit?: FooterCredit;
};

type FooterThemeConfig = {
  style?: 'light' | 'dark';
  links?: FooterLinkSection[];
  copyright?: string;
};

function BriefcaseIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inlineIcon}>
      <path
        fill="currentColor"
        d="M8 4.75A2.75 2.75 0 0 1 10.75 2h2.5A2.75 2.75 0 0 1 16 4.75V6h1.25A2.75 2.75 0 0 1 20 8.75v8.5A2.75 2.75 0 0 1 17.25 20h-10.5A2.75 2.75 0 0 1 4 17.25v-8.5A2.75 2.75 0 0 1 6.75 6H8V4.75ZM9.5 6h5V4.75a1.25 1.25 0 0 0-1.25-1.25h-2.5A1.25 1.25 0 0 0 9.5 4.75V6Zm-2.75 1.5A1.25 1.25 0 0 0 5.5 8.75v1.16c2.08.73 4.28 1.09 6.5 1.09s4.42-.36 6.5-1.1V8.75a1.25 1.25 0 0 0-1.25-1.25h-10.5ZM18.5 11.49A22.1 22.1 0 0 1 12 12.5a22.1 22.1 0 0 1-6.5-1v5.75a1.25 1.25 0 0 0 1.25 1.25h10.5a1.25 1.25 0 0 0 1.25-1.25V11.5Z"
      />
    </svg>
  );
}

function HelpIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inlineIcon}>
      <path
        fill="currentColor"
        d="M12 2.75A9.25 9.25 0 1 0 21.25 12 9.26 9.26 0 0 0 12 2.75Zm0 17A7.75 7.75 0 1 1 19.75 12 7.76 7.76 0 0 1 12 19.75Zm-.15-4.1a.95.95 0 1 0 .95.95.95.95 0 0 0-.95-.95Zm.31-9.15a3.1 3.1 0 0 0-3.41 2.54.75.75 0 1 0 1.48.23 1.61 1.61 0 0 1 1.74-1.27c.91.1 1.53.7 1.53 1.47 0 .63-.33 1.02-1.17 1.55-.98.61-1.83 1.31-1.83 2.79v.19a.75.75 0 1 0 1.5 0v-.16c0-.69.31-1.08 1.12-1.58.86-.54 1.88-1.31 1.88-2.79 0-1.5-1.15-2.74-2.84-2.97Z"
      />
    </svg>
  );
}

function WechatIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inlineIcon}>
      <path
        fill="currentColor"
        d="M8.69 4C4.96 4 2 6.45 2 9.52c0 1.77.97 3.28 2.55 4.29L4 17.5l3.46-1.72c.4.07.81.11 1.23.11.23 0 .46-.01.69-.04A5.57 5.57 0 0 1 8.06 12c0-3.01 2.78-5.44 6.22-5.44.23 0 .46.01.68.04C13.75 5 11.41 4 8.69 4Zm-2 4.02a.83.83 0 1 1 0 1.66.83.83 0 0 1 0-1.66Zm4 0a.83.83 0 1 1 0 1.66.83.83 0 0 1 0-1.66ZM15.8 8c-3 0-5.43 1.99-5.43 4.46 0 2.48 2.43 4.48 5.43 4.48.34 0 .67-.03 1-.09L19.6 18l-.63-2.26c1.42-.87 2.26-2.13 2.26-3.72C21.23 9.99 18.8 8 15.8 8Zm-1.98 3.38a.71.71 0 1 1 0 1.41.71.71 0 0 1 0-1.41Zm4 0a.71.71 0 1 1 0 1.41.71.71 0 0 1 0-1.41Z"
      />
    </svg>
  );
}

function MailIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inlineIcon}>
      <path
        fill="currentColor"
        d="M4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75A2.75 2.75 0 0 1 4.75 4Zm0 1.5c-.3 0-.58.11-.79.29l8.04 6.27 8.04-6.27a1.23 1.23 0 0 0-.79-.29H4.75Zm15.75 2.2-8.04 6.28a.75.75 0 0 1-.92 0L3.5 7.7v9.55c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V7.7Z"
      />
    </svg>
  );
}

function StatusIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inlineIcon}>
      <path
        fill="currentColor"
        d="M12 3.25A8.75 8.75 0 1 0 20.75 12 8.76 8.76 0 0 0 12 3.25Zm0 16A7.25 7.25 0 1 1 19.25 12 7.26 7.26 0 0 1 12 19.25Zm3.22-9.72a.75.75 0 0 0-1.06 0l-3.12 3.12-1.2-1.2a.75.75 0 1 0-1.06 1.06l1.73 1.73a.75.75 0 0 0 1.06 0l3.65-3.65a.75.75 0 0 0 0-1.06Z"
      />
    </svg>
  );
}

function FooterNavLink({item}: {item: FooterLinkItem}): ReactNode {
  if (item.to) {
    return (
      <Link className={styles.footerLink} to={item.to}>
        {item.label}
      </Link>
    );
  }

  return (
    <Link className={styles.footerLink} href={item.href ?? '#'}>
      {item.label}
    </Link>
  );
}

function ContactMethod({method}: {method: FooterMethod}): ReactNode {
  const icon = method.type === 'wechat' ? <WechatIcon /> : <MailIcon />;

  if (method.href) {
    return (
      <Link className={styles.contactPill} href={method.href}>
        <span className={styles.contactIcon}>{icon}</span>
        <span className={styles.contactLabel}>{method.label}:</span>
        <span className={styles.contactValue}>{method.value}</span>
      </Link>
    );
  }

  return (
    <div className={styles.contactPill}>
      <span className={styles.contactIcon}>{icon}</span>
      <span className={styles.contactLabel}>{method.label}:</span>
      <span className={styles.contactValue}>{method.value}</span>
    </div>
  );
}

export default function Footer(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const themeConfig = (siteConfig.themeConfig ?? {}) as {footer?: FooterThemeConfig};
  const footerConfig = themeConfig.footer ?? {};
  const footerLinks = footerConfig.links ?? [];
  const footerData = ((siteConfig.customFields ?? {}) as {footerData?: FooterData}).footerData ?? {};
  const footerStyle = footerConfig.style === 'dark' ? 'footer--dark' : undefined;
  const copyright = footerConfig.copyright ?? `Copyright © ${new Date().getFullYear()} ${siteConfig.title}`;
  const badges = footerData.badges ?? [];
  const contactMethods = footerData.contactMethods ?? [];
  const metaItems = footerData.metaItems ?? [];

  return (
    <footer className={clsx('footer', footerStyle, styles.footerShell)}>
      <div className={styles.inner}>
        <div className={styles.topGrid}>
          <div className={styles.brandBlock}>
            <Link className={styles.brandHeader} to="/">
              <span className={styles.brandMark} aria-hidden="true">
                <span className={styles.brandMarkText}>{'</>'}</span>
              </span>
              <span className={styles.brandName}>{siteConfig.title}</span>
            </Link>
            <p className={styles.brandDescription}>
              {footerData.description ?? siteConfig.tagline}
            </p>
            <p className={styles.brandAccent}>
              {footerData.accentText ?? '让 AI 编程更高效，让开发更简单'}
            </p>
            {badges.length > 0 && (
              <div className={styles.badges}>
                {badges.map((badge, index) => (
                  <span
                    key={badge}
                    className={clsx(styles.badge, index === 0 ? styles.badgeSuccess : styles.badgeTech)}>
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className={styles.sectionBlock}>
              <div className={styles.sectionHeading}>
                <span className={styles.sectionIcon}>
                  {section.title.includes('产品') ? <BriefcaseIcon /> : <HelpIcon />}
                </span>
                <span>{section.title}</span>
              </div>
              <div className={styles.linkList}>
                {(section.items ?? []).map((item) => (
                  <div key={item.label} className={styles.linkItem}>
                    <FooterNavLink item={item} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.contactCard}>
          <div className={styles.contactIntro}>
            <div className={styles.contactTitle}>{footerData.contactTitle ?? '联系我们'}</div>
            <div className={styles.contactDescription}>
              {footerData.contactDescription ?? '专业团队为您提供 7×24 小时技术支持'}
            </div>
          </div>
          <div className={styles.contactMethods}>
            {contactMethods.map((method) => (
              <ContactMethod key={`${method.label}-${method.value}`} method={method} />
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomRow}>
          <div className={styles.bottomLeft}>
            <span className={styles.copyright}>{copyright}</span>
            {metaItems.length > 0 && (
              <div className={styles.metaList}>
                {metaItems.map((item, index) => (
                  <div key={item} className={styles.metaItem}>
                    {index === 0 ? (
                      <span className={styles.statusWithIcon}>
                        <StatusIcon />
                        {item}
                      </span>
                    ) : (
                      <>
                        <span className={styles.metaDot} />
                        <span>{item}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {footerData.credit && (
            <div className={styles.credit}>
              <span>{footerData.credit.label} </span>
              {footerData.credit.href ? (
                <Link className={styles.creditLink} href={footerData.credit.href}>
                  {footerData.credit.name}
                </Link>
              ) : (
                <span className={styles.creditLink}>{footerData.credit.name}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
