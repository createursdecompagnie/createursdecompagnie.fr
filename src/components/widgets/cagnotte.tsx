import React, { useState, useEffect, useRef } from 'react';
import { WidgetLink } from './link';
import { useStreamlabsCharity } from '../social-community/useStreamlabsCharity';
import { WidgetDefinition } from './widget'; 

const PARAM_SHOW_CENTS = 'showCents';
const PARAM_TEXT_COLOR = 'textColor';
const PARAM_ACCENT_COLOR = 'accentColor';
const PARAM_SHADOW_INTENSITY = 'shadowIntensity';

const DEFAULT_SHOW_CENTS = false;
const DEFAULT_TEXT_COLOR = '#ffffff';
const DEFAULT_ACCENT_COLOR = '#FCA000';
const DEFAULT_SHADOW_INTENSITY = 0.4;

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

  const [displayAmount, setDisplayAmount] = useState(targetAmount);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const startValue = displayAmount;
    const change = targetAmount - startValue;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayAmount(startValue + change * eased);

      if (progress < 1) animationRef.current = requestAnimationFrame(animate);
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);

    return () => animationRef.current && cancelAnimationFrame(animationRef.current);
  }, [targetAmount]);

  const formatAmount = (amt: number) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: showCents ? 2 : 0,
      maximumFractionDigits: showCents ? 2 : 0,
    }).format(amt);

  const computeShadow = (accent: string, intensity: number) => {
    const hex = accent.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `0 0 20px rgba(${r},${g},${b},${intensity * 0.4}), 0 0 40px rgba(${r},${g},${b},${intensity * 0.2})`;
  };

  return (
    <div
      style={{
        color: textColor,
        textShadow: computeShadow(accentColor, shadowIntensity),
        fontFamily: "'Outfit', ui-sans-serif, system-ui",
        fontWeight: 900,
        fontSize: 'clamp(2em, 8vw, 5em)',
        letterSpacing: '-1px',
        lineHeight: 1,
        textAlign: 'center',
        padding: '1rem',
        minWidth: '200px',
        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
      }}
    >
      {formatAmount(displayAmount)}
    </div>
  );
};

const Configurator: React.FC = () => {
  const [showCents, setShowCents] = useState(DEFAULT_SHOW_CENTS);
  const [textColor, setTextColor] = useState(DEFAULT_TEXT_COLOR);
  const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT_COLOR);
  const [shadowIntensity, setShadowIntensity] = useState(DEFAULT_SHADOW_INTENSITY);

  useEffect(() => {
    const url = new URL(window.location.href);

    if (showCents !== DEFAULT_SHOW_CENTS) url.searchParams.set(PARAM_SHOW_CENTS, showCents.toString());
    else url.searchParams.delete(PARAM_SHOW_CENTS);

    if (textColor !== DEFAULT_TEXT_COLOR) url.searchParams.set(PARAM_TEXT_COLOR, textColor);
    else url.searchParams.delete(PARAM_TEXT_COLOR);

    if (accentColor !== DEFAULT_ACCENT_COLOR) url.searchParams.set(PARAM_ACCENT_COLOR, accentColor);
    else url.searchParams.delete(PARAM_ACCENT_COLOR);

    if (shadowIntensity !== DEFAULT_SHADOW_INTENSITY) url.searchParams.set(PARAM_SHADOW_INTENSITY, shadowIntensity.toString());
    else url.searchParams.delete(PARAM_SHADOW_INTENSITY);

    window.history.replaceState(null, '', url.toString());
  }, [showCents, textColor, accentColor, shadowIntensity]);

  const paramString = new URLSearchParams({
    widget: 'cagnotte',
    ...(showCents !== DEFAULT_SHOW_CENTS ? { showCents: showCents.toString() } : {}),
    ...(textColor !== DEFAULT_TEXT_COLOR ? { textColor } : {}),
    ...(accentColor !== DEFAULT_ACCENT_COLOR ? { accentColor } : {}),
    ...(shadowIntensity !== DEFAULT_SHADOW_INTENSITY ? { shadowIntensity: shadowIntensity.toString() } : {}),
  }).toString();

  return (
    <>
      <h4>Couleurs</h4>
      <label>
        Afficher les centimes:
        <input type="checkbox" checked={showCents} onChange={e => setShowCents(e.target.checked)} />
      </label>
      <label>
        Couleur du texte:
        <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} />
      </label>
      <label>
        Couleur accent (ombre):
        <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} />
      </label>
      <label>
        Intensité de l'ombre (0-1):
        <input type="range" min={0} max={1} step={0.01} value={shadowIntensity} onChange={e => setShadowIntensity(safeParseFloat(e.target.value, DEFAULT_SHADOW_INTENSITY))} />
      </label>
      <WidgetLink params={paramString} />
    </>
  );
};

export const Cagnotte: WidgetDefinition = {
  displayName: "Cagnotte",
  component: Component,
  configurator: Configurator,
};