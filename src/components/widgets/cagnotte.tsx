import React, { useState, useEffect, useRef } from 'react';
import { WidgetLink } from '@site/src/components/widgets/editor/link'; 
import { WidgetDefinition } from '@site/src/components/widgets/index'; 
import { useStreamlabsCharity } from '@site/src/components/social-community/useStreamlabsCharity';
import { AnimatedNumber } from '@site/src/components/animatedNumber'; 

const PARAM_SHOW_CENTS = 'showCents';
const PARAM_TEXT_COLOR = 'textColor';
const PARAM_ACCENT_COLOR = 'accentColor';
const PARAM_SHADOW_INTENSITY = 'shadowIntensity';
const PARAM_VARIATION = 'variation';

const DEFAULT_SHOW_CENTS = false;
const DEFAULT_TEXT_COLOR = '#ffffff';
const DEFAULT_ACCENT_COLOR = '#FCA000';
const DEFAULT_SHADOW_INTENSITY = 0.4;
const DEFAULT_VARIATION = 'text';

const safeParseFloat = (value: string | null, fallback: number) => {
  const parsed = parseFloat(value || '');
  return isNaN(parsed) ? fallback : parsed;
};

function useUrlParams() {
  const [params, setParams] = useState(new URLSearchParams(window.location.search));

  useEffect(() => {
    const handlePopState = () => setParams(new URLSearchParams(window.location.search));
    window.addEventListener('popstate', handlePopState);

    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      setParams(new URLSearchParams(window.location.search));
    };

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  return params;
}

const Component: React.FC = () => {
  const params = useUrlParams();
  const charityData = useStreamlabsCharity();
  const targetAmount = (charityData.totalRaised / 100) || 0;

  const showCents =
    params.get(PARAM_SHOW_CENTS) === 'true' ||
    params.get(PARAM_SHOW_CENTS) === '1' ||
    DEFAULT_SHOW_CENTS;

  const textColor = params.get(PARAM_TEXT_COLOR) || DEFAULT_TEXT_COLOR;
  const accentColor = params.get(PARAM_ACCENT_COLOR) || DEFAULT_ACCENT_COLOR;
  const shadowIntensity = safeParseFloat(params.get(PARAM_SHADOW_INTENSITY), DEFAULT_SHADOW_INTENSITY);
  const variation = params.get(PARAM_VARIATION) || DEFAULT_VARIATION;

  const formatAmount = (amt: number) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: showCents ? 2 : 0,
      maximumFractionDigits: showCents ? 2 : 0,
    }).format(amt);

  const computeDropShadow = (accent: string, intensity: number) => {
    const hex = accent.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `drop-shadow(0 0 20px rgba(${r},${g},${b},${intensity * 0.4})) 
            drop-shadow(0 0 40px rgba(${r},${g},${b},${intensity * 0.2}))`;
  };

  const computeShadow = (accent: string, intensity: number) => {
    const hex = accent.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `0 0 20px rgba(${r},${g},${b},${intensity * 0.4}), 0 0 40px rgba(${r},${g},${b},${intensity * 0.2})`;
  };

  switch (variation) {
    case 'textAndLogo':
      return (
        <div style={{
          '--cagnotte-text-color': textColor,
          '--cagnotte-accent-color': accentColor,
        } as React.CSSProperties}>
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Outfit', sans-serif"
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1vh',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '5vw',
                fontWeight: 900,
                background: `linear-gradient(90deg, var(--cagnotte-text-color), var(--cagnotte-accent-color))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: computeDropShadow(accentColor, shadowIntensity),
                lineHeight: 1,
              }}>🐾&nbsp;CDC2025</div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1vh'}}>
                <span style={{
                  background: "var(--cagnotte-accent-color)",
                  color: '#0b0f14',
                  padding: '0.1vh 1.5vw',
                  borderRadius: '999px',
                  fontSize: '2vw',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                }}>Global</span>
                <span style={{
                  fontSize: '6vw',
                  fontWeight: 900,
                  color: 'var(--cagnotte-text-color)',
                  textShadow: computeShadow(accentColor, shadowIntensity),
                  minWidth: '300px'
                }}>
                  <AnimatedNumber value={targetAmount} format={formatAmount} defaultStartValue={null} />
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div
          style={{
            color: textColor,
            textShadow: computeShadow(accentColor, shadowIntensity),
            fontFamily: "'Outfit', ui-sans-serif, system-ui",
            fontWeight: 900,
            fontSize: 'clamp(1em, 8vw, 15em)',
            letterSpacing: '-1px',
            lineHeight: 1,
            textAlign: 'center',
            padding: '1rem',
            minWidth: '200px',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
          }}
        >
          {variation === 'text' && (
            <AnimatedNumber value={targetAmount} format={formatAmount} defaultStartValue={null} />
          )}

          {variation === 'textAndLogo' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <img
                src="/img/streamlabs-logo.svg"
                alt="Streamlabs Charity"
                style={{ height: '2.5em', filter: `drop-shadow(0 0 6px ${accentColor})` }}
              />
              <AnimatedNumber value={targetAmount} format={formatAmount} defaultStartValue={null} />
            </div>
          )}
        </div>
      );
  }
};

const Editor: React.FC = () => {
  const params = new URLSearchParams(window.location.search);

  const [showCents, setShowCents] = useState(() => {
    const val = params.get(PARAM_SHOW_CENTS);
    return val === 'true' || val === '1' || DEFAULT_SHOW_CENTS;
  });

  const [textColor, setTextColor] = useState(() => params.get(PARAM_TEXT_COLOR) || DEFAULT_TEXT_COLOR);
  const [accentColor, setAccentColor] = useState(() => params.get(PARAM_ACCENT_COLOR) || DEFAULT_ACCENT_COLOR);
  const [shadowIntensity, setShadowIntensity] = useState(() =>
    safeParseFloat(params.get(PARAM_SHADOW_INTENSITY), DEFAULT_SHADOW_INTENSITY)
  );
  const [variation, setVariation] = useState(() => params.get(PARAM_VARIATION) || DEFAULT_VARIATION);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('widget', Cagnotte.id);

    if (showCents !== DEFAULT_SHOW_CENTS) url.searchParams.set(PARAM_SHOW_CENTS, showCents.toString());
    else url.searchParams.delete(PARAM_SHOW_CENTS);

    if (textColor !== DEFAULT_TEXT_COLOR) url.searchParams.set(PARAM_TEXT_COLOR, textColor);
    else url.searchParams.delete(PARAM_TEXT_COLOR);

    if (accentColor !== DEFAULT_ACCENT_COLOR) url.searchParams.set(PARAM_ACCENT_COLOR, accentColor);
    else url.searchParams.delete(PARAM_ACCENT_COLOR);

    if (shadowIntensity !== DEFAULT_SHADOW_INTENSITY) url.searchParams.set(PARAM_SHADOW_INTENSITY, shadowIntensity.toString());
    else url.searchParams.delete(PARAM_SHADOW_INTENSITY);

    if (variation !== DEFAULT_VARIATION) url.searchParams.set(PARAM_VARIATION, variation);
    else url.searchParams.delete(PARAM_VARIATION);

    window.history.replaceState(null, '', url.toString());
  }, [showCents, textColor, accentColor, shadowIntensity, variation]);

  const paramString = new URLSearchParams({
    widget: Cagnotte.id,
    ...(showCents !== DEFAULT_SHOW_CENTS ? { showCents: showCents.toString() } : {}),
    ...(textColor !== DEFAULT_TEXT_COLOR ? { textColor } : {}),
    ...(accentColor !== DEFAULT_ACCENT_COLOR ? { accentColor } : {}),
    ...(shadowIntensity !== DEFAULT_SHADOW_INTENSITY ? { shadowIntensity: shadowIntensity.toString() } : {}),
    ...(variation !== DEFAULT_VARIATION ? { variation } : {}),
  }).toString();

  return (
    <>
      <h4 className="margin-bottom--xs">Variations</h4>
      <select
        id="variation"
        className="margin-bottom--md"
        value={variation}
        onChange={(e) => setVariation(e.target.value)}
      >
        <option value="text">Texte</option>
        <option value="textAndLogo">Texte et logo</option>
      </select>

      <h4>Couleurs</h4>
      <label>
        Afficher les centimes:
        <input type="checkbox" checked={showCents} onChange={(e) => setShowCents(e.target.checked)} />
      </label>
      <label>
        Couleur du texte:
        <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
      </label>
      <label>
        Couleur accent (ombre):
        <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
      </label>
      <label>
        Intensité de l'ombre (0-1):
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={shadowIntensity}
          onChange={(e) =>
            setShadowIntensity(safeParseFloat(e.target.value, DEFAULT_SHADOW_INTENSITY))
          }
        />
      </label>

      <WidgetLink params={paramString} />
    </>
  );
};

export const Cagnotte: WidgetDefinition = {
  id: 'cagnotte',
  displayName: 'Cagnotte',
  component: Component,
  editor: Editor,
};
