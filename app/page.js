import Image from 'next/image';

const phoneDisplay = '501-617-3936';
const phoneHref = 'tel:+15016173936';

const services = [
  {
    number: '01',
    title: 'Homes',
    text: 'Residential cleaning that helps your home feel fresh, comfortable and back in order.'
  },
  {
    number: '02',
    title: 'Offices',
    text: 'Dependable office cleaning for a cleaner workspace and a better first impression.'
  },
  {
    number: '03',
    title: 'Job Sites',
    text: 'Post-construction and job site cleanup handled thoroughly, safely and reliably.'
  },
  {
    number: '04',
    title: 'Deep Cleaning',
    text: 'Detailed cleaning for spaces that need more than the everyday wipe-down.'
  }
];

const additionalServices = [
  'Move-in cleaning',
  'Move-out cleaning',
  'Before-and-after move cleaning',
  'Home and office cleanouts',
  'Junk removal help',
  'Haul-off prep',
  'General cleanups'
];

export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HouseCleaningService'],
    name: 'Renew 360 Cleaning Company LLC',
    telephone: '+1-501-617-3936',
    slogan: 'Renewing your space. Restoring peace.',
    description:
      'Residential, commercial and construction cleaning, including deep cleaning, move-in and move-out cleaning, cleanouts and haul-off help.',
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/renew360-official-flyer.jpg`,
    founder: { '@type': 'Person', name: 'Rebecca Turner' },
    priceRange: '$$',
    serviceType: additionalServices.concat([
      'Residential cleaning',
      'Office cleaning',
      'Construction site cleanup',
      'Deep cleaning'
    ])
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="site-header">
        <div className="rainbow-rule" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="masthead wrap">
          <a className="brand" href="#top" aria-label="Renew 360 Cleaning Company home">
            <Image
              src="/images/renew360-logo.png"
              alt="Renew 360 Cleaning Company LLC logo"
              width={430}
              height={315}
              priority
            />
          </a>

          <div className="masthead-center" aria-label="Service categories">
            <span>Residential</span>
            <i />
            <span>Commercial</span>
            <i />
            <span>Construction</span>
          </div>

          <div className="masthead-contact">
            <p>Free estimates</p>
            <a href={phoneHref}>{phoneDisplay}</a>
            <span>Call or text Rebecca Turner</span>
          </div>
        </div>

        <nav className="nav-bar" aria-label="Main navigation">
          <div className="wrap nav-inner">
            <a href="#services">Cleaning services</a>
            <a href="#cleanouts">Cleanouts & haul-off</a>
            <a href="#values">What we stand for</a>
            <a className="nav-call" href={phoneHref}>Licensed & insured · Call today</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Clean spaces. Renewed lives.</p>
            <h1>
              We do more than clean.
              <span>We help bring order back.</span>
            </h1>
            <p className="hero-lead">
              From homes and offices to job sites and move-out cleanups, Renew 360 is ready to help your space feel fresh from top to bottom.
            </p>

            <div className="estimate-ticket">
              <div>
                <small>Talk directly with</small>
                <strong>Rebecca Turner</strong>
              </div>
              <a href={phoneHref} aria-label={`Call Renew 360 at ${phoneDisplay}`}>
                <span>Call or text</span>
                {phoneDisplay}
              </a>
            </div>

            <p className="faith-line">Faith. Integrity. Excellence. That&apos;s our promise.</p>
          </div>

          <div className="hero-visual">
            <div className="photo-frame">
              <Image
                src="/images/renew360-official-flyer.jpg"
                alt="Clean home, office and construction spaces"
                fill
                sizes="(max-width: 900px) 100vw, 46vw"
                priority
              />
            </div>
            <div className="hero-stamp">
              <span>We clean.</span>
              <strong>You relax.</strong>
              <span>We renew.</span>
              <em>You thrive.</em>
            </div>
            <div className="hero-side-note">
              <span>Residential</span>
              <span>Commercial</span>
              <span>Construction</span>
            </div>
          </div>
        </section>

        <section className="service-intro" id="services">
          <div className="wrap service-layout">
            <div className="service-heading">
              <p className="section-kicker">A full 360 clean</p>
              <h2>One team for the spaces life happens in.</h2>
              <p>
                Whether you need a fresh start, a deep clean or help getting a space back in order, the work is handled with care and attention to the details.
              </p>
            </div>

            <div className="service-ledger">
              {services.map((service) => (
                <article key={service.number}>
                  <span>{service.number}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cleanout-section" id="cleanouts">
       <div className="cleanout-image">
  <Image
    src="/images/trailer-cleanouts.jpg"
    alt="Renew 360 trailer available for cleanups and haul-off help"
    fill
    sizes="(max-width: 900px) 100vw, 44vw"
    className="cleanout-flyer"
  />
</div>

          <div className="cleanout-copy">
            <p className="section-kicker light">When the job is bigger than a regular clean</p>
            <h2>Clean it out. Haul it off. Start fresh.</h2>
            <p>
              Got junk piled up, a move coming up or a property that needs to be cleared before the cleaning starts? Renew 360 has a trailer available for bigger cleanouts and haul-off help.
            </p>

            <div className="tag-list" aria-label="Additional cleaning services">
              {additionalServices.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>

            <div className="cleanout-contact">
              <p>Pricing depends on the space and the amount that needs to go.</p>
              <a href={phoneHref}>Call for details and availability →</a>
            </div>
          </div>
        </section>

        <section className="values" id="values">
          <div className="wrap">
            <div className="values-title">
              <div className="cross-mark" aria-hidden="true">✝</div>
              <p className="section-kicker">Glorifying God in all we do</p>
              <h2>Good work. Honest service. A space you can feel proud of again.</h2>
            </div>

            <div className="values-strip">
              <article>
                <b>Faith-based</b>
                <p>Christian values are at the heart of the way the work is handled.</p>
              </article>
              <article>
                <b>Reliable & trustworthy</b>
                <p>Honest service and dependable results you can count on.</p>
              </article>
              <article>
                <b>Detail oriented</b>
                <p>It is not just cleaned. The little things are cared for too.</p>
              </article>
              <article>
                <b>Eco-friendly options</b>
                <p>Safer options are available for your family, pets and the planet.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="closing-cta">
          <div className="wrap closing-grid">
            <div>
              <p className="section-kicker light">Free estimates</p>
              <h2>Let&apos;s renew your space today.</h2>
              <p>Tell Rebecca what needs cleaned, cleared or brought back in order.</p>
            </div>

            <a className="big-phone" href={phoneHref}>
              <small>Call or text</small>
              <strong>{phoneDisplay}</strong>
              <span>Rebecca Turner · Licensed & insured</span>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <p><strong>Renew 360 Cleaning Company LLC</strong><br />Renewing your space. Restoring peace.</p>
          <blockquote>“Behold, I am making all things new.” <span>Revelation 21:5</span></blockquote>
        </div>
      </footer>
    </>
  );
}
